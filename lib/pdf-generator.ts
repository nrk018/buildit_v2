import jsPDF from 'jspdf'
import { problemStatements } from '@/data/fantastic4-problems'

// Convert image to base64, handling SVG by converting to PNG
const getImageAsBase64 = async (src: string): Promise<string> => {
  try {
    const imageUrl = src.startsWith('/') ? window.location.origin + src : src
    const response = await fetch(imageUrl)
    
    // Check if it's an SVG
    if (src.endsWith('.svg') || response.headers.get('content-type')?.includes('svg')) {
      const svgText = await response.text()
      
      // Convert SVG to PNG using canvas
      return new Promise((resolve, reject) => {
        const img = new Image()
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(svgBlob)
        
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width || 2000
          canvas.height = img.height || 796
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(img, 0, 0)
            const pngData = canvas.toDataURL('image/png')
            URL.revokeObjectURL(url)
            resolve(pngData)
          } else {
            URL.revokeObjectURL(url)
            reject(new Error('Could not get canvas context'))
          }
        }
        
        img.onerror = () => {
          URL.revokeObjectURL(url)
          reject(new Error('Failed to load SVG image'))
        }
        
        img.src = url
      })
    } else {
      // Handle PNG/JPG normally
      const blob = await response.blob()
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    }
  } catch (error) {
    console.error('Error loading image:', error)
    return ''
  }
}

// Create ripple pattern matching the website's background
const createRipplePattern = (): string => {
  const canvas = document.createElement('canvas')
  canvas.width = 400
  canvas.height = 400
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // Dark background
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, 400, 400)

  // Grid pattern with borders - subtle
  ctx.strokeStyle = '#262626'
  ctx.lineWidth = 0.5

  const cellSize = 20
  for (let x = 0; x < 400; x += cellSize) {
    for (let y = 0; y < 400; y += cellSize) {
      ctx.strokeRect(x, y, cellSize, cellSize)
    }
  }

  // Very subtle blue highlights
  ctx.fillStyle = 'rgba(59, 130, 246, 0.03)'
  for (let x = 0; x < 400; x += cellSize * 4) {
    for (let y = 0; y < 400; y += cellSize * 4) {
      if ((x + y) % (cellSize * 8) === 0) {
        ctx.fillRect(x, y, cellSize, cellSize)
      }
    }
  }

  return canvas.toDataURL('image/png')
}

export const generateProblemStatementsPDF = async () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - 2 * margin
  let yPosition = 15 // Reduced top padding

  // Helper to add background to each page
  const addPageBackground = () => {
    // Dark base background
    doc.setFillColor(10, 10, 10)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')

    // Add ripple pattern overlay - very subtle
    const pattern = createRipplePattern()
    if (pattern) {
      doc.setGState(doc.GState({ opacity: 0.1 }))
      const patternSize = 35
      for (let x = 0; x < pageWidth + patternSize; x += patternSize) {
        for (let y = 0; y < pageHeight + patternSize; y += patternSize) {
          doc.addImage(pattern, 'PNG', x, y, patternSize, patternSize)
        }
      }
      doc.setGState(doc.GState({ opacity: 1.0 }))
    }
  }

  // Add background to first page
  addPageBackground()

  // Title: Problem Statements - centered, clear font
  doc.setFontSize(32)
  doc.setTextColor(96, 165, 250) // Sky blue
  doc.setFont('helvetica', 'bold')
  const titleText = 'Problem Statements'
  const titleWidth = doc.getTextWidth(titleText)
  doc.text(titleText, (pageWidth - titleWidth) / 2, yPosition) // Center the title
  yPosition += 12

  // Open Innovation section - centered, consistent styling
  const openInnovPadding = 6
  const openInnovBoxWidth = contentWidth
  const openInnovBoxX = margin
  const openInnovBoxY = yPosition
  const openInnovHeight = 16
  
  // Calculate text to determine exact height
  doc.setFontSize(10)
  const openInnovTitle = 'Open Innovation'
  const openInnovDesc = 'Participants can modify problems or create their own as per MVP requirements'
  const openInnovDescLines = doc.splitTextToSize(openInnovDesc, openInnovBoxWidth - openInnovPadding * 2)
  const calculatedHeight = 6 + openInnovDescLines.length * 4.5 + 4
  
  // Box background - consistent border weight with cards
  doc.setFillColor(25, 35, 55)
  doc.setDrawColor(96, 165, 250)
  doc.setLineWidth(0.4) // Same as cards for consistency
  doc.roundedRect(openInnovBoxX, openInnovBoxY, openInnovBoxWidth, calculatedHeight, 4, 4, 'FD') // Same radius as cards
  
  // Open Innovation title
  doc.setFontSize(10)
  doc.setTextColor(96, 165, 250)
  doc.setFont('helvetica', 'bold')
  doc.text(openInnovTitle, openInnovBoxX + openInnovPadding, openInnovBoxY + 5)
  
  // Open Innovation description
  doc.setFontSize(9)
  doc.setTextColor(220, 220, 220)
  doc.setFont('helvetica', 'normal')
  doc.text(openInnovDescLines, openInnovBoxX + openInnovPadding, openInnovBoxY + 9.5)
  
  yPosition += calculatedHeight + 10

  // Divider - consistent styling
  doc.setDrawColor(96, 165, 250, 0.25)
  doc.setLineWidth(0.3)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 8

  // Problem Statements Cards - consistent styling
  const cardPadding = 6
  const cardBorderRadius = 4
  const cardBorderWidth = 0.4
  const cardSpacing = 6 // Consistent spacing between cards

  problemStatements.forEach((problem, index) => {
    // Calculate card dimensions accurately
    doc.setFontSize(10.5)
    const titleLines = doc.splitTextToSize(problem.title, contentWidth - cardPadding * 2)
    const titleHeight = titleLines.length * 6
    
    doc.setFontSize(9)
    const descLines = doc.splitTextToSize(problem.description, contentWidth - cardPadding * 2)
    const descHeight = descLines.length * 4.5
    
    // Industry badge height
    const industryHeight = 5
    // Tags height
    const tagsText = problem.tags.join(' • ')
    doc.setFontSize(8)
    const tagsLines = doc.splitTextToSize(tagsText, contentWidth - cardPadding * 2)
    const tagsHeight = tagsLines.length * 3.5 + 2
    
    // Total card height with consistent padding
    const cardHeight = cardPadding * 2 + industryHeight + 3 + titleHeight + 4 + descHeight + 5 + tagsHeight

    // New page if needed
    if (yPosition + cardHeight > pageHeight - 25) {
      doc.addPage()
      yPosition = 15
      addPageBackground()
    }

    const cardY = yPosition
    yPosition += cardPadding

    // Card background - consistent styling
    doc.setFillColor(25, 25, 25)
    doc.setDrawColor(64, 64, 64)
    doc.setLineWidth(cardBorderWidth)
    doc.roundedRect(margin, cardY, contentWidth, cardHeight, cardBorderRadius, cardBorderRadius, 'FD')

    // Industry badge (top left) - better spacing
    doc.setFontSize(8)
    doc.setTextColor(96, 165, 250)
    doc.setFont('helvetica', 'bold')
    const industryText = problem.industry.toUpperCase()
    doc.text(industryText, margin + cardPadding, yPosition + 3.5)
    
    // Problem ID (top right) - aligned with industry
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.setFont('courier', 'normal')
    const idText = `#${problem.id}`
    const idWidth = doc.getTextWidth(idText)
    doc.text(idText, pageWidth - margin - cardPadding - idWidth, yPosition + 3.5)
    
    yPosition += industryHeight + 4

    // Problem Title - improved size and spacing
    doc.setFontSize(10.5)
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.text(titleLines, margin + cardPadding, yPosition)
    yPosition += titleHeight + 4

    // Problem Description - better spacing
    doc.setFontSize(9)
    doc.setTextColor(200, 200, 200)
    doc.setFont('helvetica', 'normal')
    doc.text(descLines, margin + cardPadding, yPosition)
    yPosition += descHeight + 5

    // Tags - better spacing from description
    doc.setFontSize(8)
    doc.setTextColor(140, 140, 140) // Slightly lighter for better contrast
    doc.setFont('helvetica', 'normal')
    doc.text(`Tags: ${tagsText}`, margin + cardPadding, yPosition)
    yPosition += tagsHeight + cardPadding

    // Consistent spacing between cards
    if (index < problemStatements.length - 1) {
      yPosition += cardSpacing
    }
  })

  // Footer on all pages - consistent styling
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(7)
    doc.setTextColor(120, 120, 120) // Better contrast
    doc.setFont('helvetica', 'normal')
    doc.text(
      `Page ${i} of ${totalPages} • Fantastic 4 - Problem Statements`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    )
  }

  // Save PDF
  doc.save('Fantastic-4-Problem-Statements.pdf')
}
