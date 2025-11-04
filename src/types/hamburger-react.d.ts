declare module "hamburger-react" {
  import { Dispatch, SetStateAction } from "react"

  export interface CommonBurgerProps {
    /** Color of the burger lines, defaults to currentColor */
    color?: string
    /** Size of the burger (width and height), defaults to 32 */
    size?: number
    /** If true, the burger will be toggled on first render */
    toggled?: boolean
    /** Function to handle the toggle state of the burger */
    toggle?: Dispatch<SetStateAction<boolean>>
    /** Additional class names for styling */
    className?: string
    /** Additional style object */
    style?: React.CSSProperties
    /** Additional props are passed to the burger */
    [key: string]: any
  }

  export type BurgerProps = CommonBurgerProps & {
    /** Label for the burger button for a11y */
    label?: string
    /** Hide or show the burger */
    hideOutline?: boolean
    /** Distance of the lines to the borders */
    distance?: "sm" | "md" | "lg"
    /** Duration of the animation */
    duration?: number
    /** Border radius of the burger lines */
    rounded?: boolean
  }

  export function Squash(props: BurgerProps): JSX.Element
  export function Fade(props: BurgerProps): JSX.Element
  export function Pivot(props: BurgerProps): JSX.Element
  export function Turn(props: BurgerProps): JSX.Element
  export function Twirl(props: BurgerProps): JSX.Element
  export function Slant(props: BurgerProps): JSX.Element
  export function Sling(props: BurgerProps): JSX.Element
  export function Rotate(props: BurgerProps): JSX.Element
  export function Cross(props: BurgerProps): JSX.Element
}