import type { NuxtModule } from '@nuxt/schema'
import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {}

const DEFAULTS: ModuleOptions = {}

const CONFIG_KEY = '@orbisk/vue-use-paint-worklet'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue-use-paint-worklet',
    configKey: CONFIG_KEY,
  },
  defaults: DEFAULTS,
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Add templates (options and directives)
    addPlugin(resolve('./runtime/templates/plugin'))

    // Add auto imports
    addImportsDir(resolve('./runtime/composables'))

    await addComponentsDir({ path: resolve('../../components') })

    // Transpile necessary packages
    if (!nuxt.options.build.transpile)
      nuxt.options.build.transpile = []
    const transpileList = ['defu', '@orbisk/vue-use-paint-worklet', '@vueuse/core']
    transpileList.forEach((pkgName) => {
      if (!nuxt.options.build.transpile.includes(pkgName))
        nuxt.options.build.transpile.push(pkgName)
    })
  },
}) satisfies NuxtModule
