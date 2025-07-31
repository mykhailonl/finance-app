declare module "*.svg" {
  import React from "react"
  const ReactComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>
  export { ReactComponent }
  const src: string
  export default src
}
