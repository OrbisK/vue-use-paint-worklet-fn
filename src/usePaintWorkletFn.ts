import type { MaybeElement, MaybeElementRef } from '@vueuse/core'
import { unrefElement, useCssVar } from '@vueuse/core'
import { onMounted, useId } from 'vue'

// from https://github.com/chromium/chromium/blob/ae75770af3317a493e6d7268e969c87963778c9a/chrome/browser/resources/lens/overlay/paint_api.d.ts
interface PaintRenderingContext2D extends CanvasState, CanvasTransform,
  CanvasCompositing,
  CanvasImageSmoothing,
  CanvasFillStrokeStyles,
  CanvasShadowStyles, CanvasRect,
  CanvasDrawPath, CanvasDrawImage,
  CanvasPathDrawingStyles, CanvasPath {}

declare class PaintSize {
  readonly width: number
  readonly height: number
}

export type PaintFn = (ctx: PaintRenderingContext2D, size: PaintSize, properties: StylePropertyMapReadOnly,) => void

export interface UsePaintWorkletElementOptions {
  /**
   * @default random name
   */
  name?: string
  /**
   * @default []
   */
  inputProperties?: string[]
  /**
   * @default {}
   */
  contextOptions?: object
  /**
   * @default --vue-use-paint-worklet-toggle
   */
  toggleProperty?: string
}

export function usePaintWorkletElementFn(target: MaybeElementRef<MaybeElement>, fn: PaintFn, options: UsePaintWorkletElementOptions = {}) {
  const {
    name = useId(),
    inputProperties = [],
    contextOptions = {},
    toggleProperty = '--vue-use-paint-worklet-toggle',
  } = options

  const toggleRef = useCssVar(toggleProperty, target, { initialValue: '0', observe: false })

  const repaint = () => {
    toggleRef.value = toggleRef.value === '0' ? '1' : '0'
  }

  const classCode = `
    const fn = ${fn}
    
    registerPaint('${name}', class {
      static get contextOptions() { return ${JSON.stringify(contextOptions)}; }
      static get inputProperties() { return ${JSON.stringify([toggleProperty, ...inputProperties])}; }
      paint(...args) {
        fn(...args)
      }
    })
  `

  const blob = new Blob([classCode], { type: 'text/javascript' })

  onMounted(
    () => {
      if (target && unrefElement(target))
        unrefElement(target)!.style.backgroundImage = `paint(${name})`
      // @ts-expect-error missing types
      CSS.paintWorklet.addModule(URL.createObjectURL(blob))
    },
  )
  return { name, repaint }
}
