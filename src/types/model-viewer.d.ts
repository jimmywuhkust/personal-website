/**
 * Type declaration for the <model-viewer> web component (loaded from CDN in
 * index.html). Renders GLB/GLTF 3D models — e.g. exported PCB models — with
 * orbit controls on project detail pages.
 */
declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        alt?: string
        'camera-controls'?: boolean
        'auto-rotate'?: boolean
        'shadow-intensity'?: string
        exposure?: string
        ar?: boolean
        poster?: string
        loading?: string
      }
    }
  }
}

export {}
