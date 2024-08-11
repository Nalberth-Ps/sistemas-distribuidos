function resetNavbarState(navbarLinks: NodeListOf<Element>) {
  navbarLinks.forEach(link => {
    const targetId = link.getAttribute('data-target')
    if (!targetId) return

    const target = document.getElementById(targetId)
    link.classList.remove('active')

    if (target) target.style.display = 'none'
  })
}

function activateSection(link: Element) {
  const targetId = link.getAttribute('data-target')
  if (!targetId) return

  const targetElement = document.getElementById(targetId)
  if (!targetElement) return

  link.classList.add('active')
  targetElement.style.display = 'block'
}

function initializeDefaultState(
  navbarLinks: NodeListOf<Element>,
  defaultSection: string | null,
) {
  const defaultLink = defaultSection
    ? document.querySelector(`[data-target="${defaultSection}"]`)
    : navbarLinks[0]

  if (!defaultLink) return

  activateSection(defaultLink)
}

export function setupNavbar(
  navbarSelector: string,
  defaultSection: string | null = null,
) {
  const navbarLinks = document.querySelectorAll(navbarSelector)

  if (navbarLinks.length === 0) return

  navbarLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault()
      resetNavbarState(navbarLinks)
      activateSection(link)
    })
  })

  initializeDefaultState(navbarLinks, defaultSection)
}
