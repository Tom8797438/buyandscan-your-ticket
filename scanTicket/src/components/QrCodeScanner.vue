<template>
  <div class="cadre-scan">
    <div class="camera-frame">
      <qrcode-stream
        :constraints="selectedConstraints"
        :track="trackFunctionSelected.value"
        :formats="selectedBarcodeFormats"
        @decode="onDecode"
        @error="onError"
        @detect="onDetect"
        @camera-on="onCameraReady"
      />
    </div>
    <div class="section-scan">
    <p class="selection-camera">
      Selection de la caméra
      <select v-model="selectedConstraints" class="selection-camera">
        <option
          v-for="option in constraintOptions"
          :key="option.label"
          :value="option.constraints"
        >
          {{ option.label }}
        </option>
      </select>
    </p>
 
    <!-- <p>
      Detected codes are visually highlighted in real-time. Use the following dropdown to change the
      flavor:
      <select v-model="trackFunctionSelected">
        <option
          v-for="option in trackFunctionOptions"
          :key="option.text"
          :value="option"
        >
          {{ option.text }}
        </option>
      </select>
    </p> -->

    <p class="selection-camera">
      Type de code à scanner <br />
      <span
        v-for="option in Object.keys(barcodeFormats)"
        :key="option"
        class="barcode-format-checkbox"
      >
        <input
          type="checkbox"
          v-model="barcodeFormats[option]"
          :id="option"
        />
        <label :for="option">{{ option }}</label>
      </span>
    </p> 

    <!-- <p class="error">{{ error }}</p> -->

    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

   
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  components: {
    QrcodeStream,
  },
  setup() {
    /*** Detection Handling ***/
    const result = ref('')

    function onDetect(detectedCodes) {
      console.log(detectedCodes)
      result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue))
    }

    /*** Select Camera ***/
    const selectedConstraints = ref({ facingMode: 'environment' })
    const defaultConstraintOptions = [
      { label: 'rear camera', constraints: { facingMode: 'environment' } },
      { label: 'front camera', constraints: { facingMode: 'user' } }
    ]
    const constraintOptions = ref(defaultConstraintOptions)

    async function onCameraReady() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')

        constraintOptions.value = [
          ...defaultConstraintOptions,
          ...videoDevices.map(({ deviceId, label }) => ({
            label: `${label} (ID: ${deviceId})`,
            constraints: { deviceId }
          }))
        ]

        error.value = ''
      } catch (err) {
        console.error(err)
      }
    }

    /*** Track Functions ***/
    function paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'red'
        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    }

    function paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
      }
    }

    function paintCenterText(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode

        const centerX = boundingBox.x + boundingBox.width / 2
        const centerY = boundingBox.y + boundingBox.height / 2

        const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

        ctx.font = `bold ${fontSize}px sans-serif`
        ctx.textAlign = 'center'

        ctx.lineWidth = 3
        ctx.strokeStyle = '#35495e'
        ctx.strokeText(detectedCode.rawValue, centerX, centerY)

        ctx.fillStyle = '#5cb984'
        ctx.fillText(rawValue, centerX, centerY)
      }
    }

    const trackFunctionOptions = [
      { text: 'nothing (default)', value: undefined },
      { text: 'outline', value: paintOutline },
      { text: 'centered text', value: paintCenterText },
      { text: 'bounding box', value: paintBoundingBox }
    ]
    const trackFunctionSelected = ref(trackFunctionOptions[1])

    /*** Barcode Formats ***/
    const barcodeFormats = ref({
      // aztec: false,
      // code_128: false,
      // code_39: false,
      // code_93: false,
      // codabar: false,
      // databar: false,
      // databar_expanded: false,
      // data_matrix: false,
      // dx_film_edge: false,
      ean_13: false,
      // ean_8: false,
      // itf: false,
      // maxi_code: false,
      // micro_qr_code: false,
      // pdf417: false,
      qr_code: true,
      // rm_qr_code: false,
      // upc_a: false,
      // upc_e: false,
      // linear_codes: false,
      // matrix_codes: false
    })

    const selectedBarcodeFormats = computed(() => {
      return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
    })

    /*** Error Handling ***/
    const error = ref('')

    function onError(err) {
      error.value = `[${err.name}]: `

      if (err.name === 'NotAllowedError') {
        error.value += 'you need to grant camera access permission'
      } else if (err.name === 'NotFoundError') {
        error.value += 'no camera on this device'
      } else if (err.name === 'NotSupportedError') {
        error.value += 'secure context required (HTTPS, localhost)'
      } else if (err.name === 'NotReadableError') {
        error.value += 'is the camera already in use?'
      } else if (err.name === 'OverconstrainedError') {
        error.value += 'installed cameras are not suitable'
      } else if (err.name === 'StreamApiNotSupportedError') {
        error.value += 'Stream API is not supported in this browser'
      } else if (err.name === 'InsecureContextError') {
        error.value +=
          'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
      } else {
        error.value += err.message
      }
    }

    return {
      result,
      selectedConstraints,
      constraintOptions,
      trackFunctionOptions,
      trackFunctionSelected,
      barcodeFormats,
      selectedBarcodeFormats,
      error,
      onDetect,
      onError,
      onCameraReady
    }
  }
}
</script>

<style scoped>
@import '@/assets/styles/QrCodeScanner.css'
</style>


