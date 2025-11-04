import AboutSection from "../../components/AboutSection/AboutSection"
import CategoryCards from "../../components/CategoryCards/CategoryCards"
import { ReactNode } from "react"

interface CategoryLayoutProps {
  children: ReactNode;
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return (
    <div>
      {children}
      <CategoryCards />
      <AboutSection />
    </div>
  )
}
