import AboutSection from "@/components/AboutSection/AboutSection"
import CategoryCards from "@/components/CategoryCards/CategoryCards"

export default function CategoryLayout({ children }) {
  return (
    <div>
      {children}
      <CategoryCards />
      <AboutSection />
    </div>
  )
}
