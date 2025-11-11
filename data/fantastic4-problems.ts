export interface ProblemStatement {
  id: number
  industry: string
  title: string
  description: string
  tags: string[]
}

export const problemStatements: ProblemStatement[] = [
  {
    id: 1,
    industry: "Healthcare",
    title: "Patient Appointment Mismanagement in Clinics",
    description: "Clinics and small hospitals often struggle with managing patient appointments, leading to long waiting times and overcrowded lobbies. Patients arrive without knowing expected delays, while staff handle registrations manually, causing miscommunication and frustration.",
    tags: ["Healthcare", "Appointment Management", "Patient Experience"]
  },
  {
    id: 2,
    industry: "Logistics & Delivery",
    title: "Delivery Personnel Route Inefficiency",
    description: "Local delivery companies face challenges optimizing routes for their delivery agents. Many agents manually plan routes, leading to longer travel times, uneven workload distribution, and delayed deliveries.",
    tags: ["Logistics", "Route Optimization", "Delivery"]
  },
  {
    id: 3,
    industry: "Food & Restaurant",
    title: "Inconsistent Daily Demand for Menu Items",
    description: "Restaurants often prepare food based on guesswork, resulting in either shortages or wastage. Without proper forecasting, chefs cannot predict customer demand for specific dishes.",
    tags: ["Food", "Demand Forecasting", "Inventory"]
  },
  {
    id: 4,
    industry: "Retail & Supermarkets",
    title: "Lack of Real-Time Product Availability Information",
    description: "Customers frequently visit supermarkets only to find essential products out of stock. Staff update shelves manually, and product availability is not displayed digitally.",
    tags: ["Retail", "Inventory Management", "Customer Experience"]
  },
  {
    id: 5,
    industry: "NGO & Social Sector",
    title: "Volunteer Task Assignment and Tracking Challenges",
    description: "NGOs manage multiple activities such as drives, distributions, and events. Volunteers often receive task instructions through informal messaging groups, creating misalignment and low accountability.",
    tags: ["NGO", "Volunteer Management", "Task Tracking"]
  },
  {
    id: 6,
    industry: "Corporate & HR",
    title: "Employee Feedback Isn't Timely or Actionable",
    description: "Companies require continuous feedback to improve culture and productivity, but employees hesitate to share concerns openly. Annual feedback forms are too late to catch real-time problems.",
    tags: ["HR", "Employee Engagement", "Feedback"]
  },
  {
    id: 7,
    industry: "Finance & Banking",
    title: "Customers Struggle to Track Small Daily Expenses",
    description: "Many customers do not realize where their money goes due to untracked minor expenses. Banks provide statements but not easy tools for categorizing and understanding spending behavior.",
    tags: ["Finance", "Expense Tracking", "Budgeting"]
  },
  {
    id: 8,
    industry: "Education",
    title: "Parents Lack Visibility into Homework and Class Activities",
    description: "Schools often communicate homework, circulars, and test schedules inconsistently through diaries or WhatsApp groups. Parents miss important updates, and students fail to complete assignments.",
    tags: ["Education", "Parent Communication", "School Management"]
  },
  {
    id: 9,
    industry: "Manufacturing",
    title: "Manual Tracking of Machine Downtime",
    description: "Factories often document machine failures on paper or verbally. As a result, managers cannot identify patterns in downtime, maintenance delays, or recurring issues.",
    tags: ["Manufacturing", "Machine Maintenance", "Downtime Tracking"]
  },
  {
    id: 10,
    industry: "Travel & Tourism",
    title: "Tourists Lack Local Recommendations Based on Preferences",
    description: "Tourists rely on generic reviews instead of personalized recommendations. They often miss local gems, cultural events, or food spots relevant to their interests.",
    tags: ["Travel", "Recommendations", "Tourism"]
  },
  {
    id: 11,
    industry: "Fitness & Wellness",
    title: "Users Struggle to Maintain Workout Consistency",
    description: "People start workout routines enthusiastically but gradually lose track due to lack of motivation and progress visibility. Without measurable habit tracking, users fail to maintain consistency.",
    tags: ["Fitness", "Wellness", "Habit Tracking"]
  },
  {
    id: 12,
    industry: "Agriculture",
    title: "Farmers Lack Simple Tools to Track Crop Expenses",
    description: "Farmers manually track expenses for seeds, fertilizers, labor, and irrigation. This disorganized approach makes it difficult to calculate profit margins or identify overspending.",
    tags: ["Agriculture", "Expense Tracking", "Farm Management"]
  },
  {
    id: 13,
    industry: "Hospitality",
    title: "Guest Service Requests Are Delayed or Missed",
    description: "Hotels receive guest requests through phone calls or front-desk visits. Staff often forget to relay requests, causing delays in housekeeping, room service, or maintenance.",
    tags: ["Hospitality", "Guest Services", "Hotel Management"]
  },
  {
    id: 14,
    industry: "Real Estate",
    title: "Property Visitors Management Is Unorganized",
    description: "Housing societies and commercial buildings manually record visitors in logbooks. Security personnel cannot verify details or track frequent visitors.",
    tags: ["Real Estate", "Visitor Management", "Security"]
  },
  {
    id: 15,
    industry: "Entertainment & Events",
    title: "Event Organizers Struggle With Ticket Verification",
    description: "Small to mid-scale events manually check attendees through printed lists or verbal confirmation. This causes long queues, entry delays, and inaccurate attendee counts.",
    tags: ["Events", "Ticket Management", "Event Planning"]
  },
  {
    id: 16,
    industry: "E-Commerce",
    title: "Customers Cannot Easily Track Return Status",
    description: "When customers return products, they often don't receive clear updates on the status. Email-based updates get lost, and support teams struggle with repeated inquiries.",
    tags: ["E-Commerce", "Returns", "Customer Service"]
  },
  {
    id: 17,
    industry: "Cybersecurity",
    title: "Users Reuse Weak Passwords Across Platforms",
    description: "Individuals often reuse the same passwords for multiple websites. This increases vulnerability to breaches and phishing attacks. Many users lack an organized method to track their credentials securely.",
    tags: ["Cybersecurity", "Password Management", "Security"]
  },
  {
    id: 18,
    industry: "Transportation",
    title: "Commuters Lack Real-Time Bus or Shuttle Status",
    description: "Students and employees using shuttle/bus services do not know real-time arrival, delays, or seat availability. This leads to waiting, crowding, and missed rides—especially during peak hours.",
    tags: ["Transportation", "Public Transit", "Real-Time Tracking"]
  },
  {
    id: 19,
    industry: "Freelancing & Creator Economy",
    title: "Freelancers Cannot Showcase Their Work Professionally",
    description: "Many freelancers rely on scattered links, Google Drive folders, or Instagram posts to showcase work. This lacks professionalism and makes it difficult to impress clients.",
    tags: ["Freelancing", "Portfolio", "Creator Economy"]
  },
  {
    id: 20,
    industry: "Food Delivery & Cloud Kitchens",
    title: "Customers Cannot Track Order Preparation Stages",
    description: "Cloud kitchens receive high order volume but do not provide real-time visibility into food preparation status. Customers are left guessing whether food is being cooked, packed, or delayed.",
    tags: ["Food Delivery", "Cloud Kitchens", "Order Tracking"]
  }
]

