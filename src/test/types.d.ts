/// <reference types="astro/client" />

declare module 'astro/config' {
  import type { AstroUserConfig } from 'astro'
  export function getViteConfig(config: any): any
  export function defineConfig(config: AstroUserConfig): AstroUserConfig
}

declare module 'astro/container' {
  export interface ContainerRenderOptions {
    props?: Record<string, any>
    slots?: Record<string, any>
    locals?: Record<string, any>
  }

  export class experimental_AstroContainer {
    static create(options?: {
      renderers?: any[]
    }): Promise<experimental_AstroContainer>
    renderToString(
      component: any,
      options?: ContainerRenderOptions
    ): Promise<string>
    renderToResponse(
      component: any,
      options?: ContainerRenderOptions
    ): Promise<Response>
  }
}

declare module 'astro:container' {
  export function loadRenderers(renderers: any[]): Promise<any[]>
}
