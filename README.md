# Company Directory Web Application

This repository contains the source code for a web application that allows users to explore companies and their directors. The project was built with a focus on clean implementation, scalability, and performance, leveraging modern tools and technologies.

---

## 🚀 Features

- **Database**: Utilized [Neon.tech](https://neon.tech/) for a PostgreSQL database.  
- **ORM**: Used [Prisma](https://www.prisma.io/) to define and manage database models.  
- **APIs**: Created robust APIs to fetch data for companies and directors.  
- **Rendering**:
  - Implemented **SSR (Server-Side Rendering)** for dynamic data fetching.  
  - Used **SSG (Static Site Generation)** for pre-rendering pages to optimize performance.  
- **Pages**:
  - `/`: Displays a list of all companies (loaded via SSR/SSG).  
  - `/companies`: Displays the detailed list of companies.  
  - `/company/[id]`: A detailed view of a specific company and its directors.  

---

## ⚙️ Tech Stack

- **Next.js**: For building the web application with SSR and SSG.  
- **Tailwind CSS**: For responsive and consistent UI design.  
- **PostgreSQL**: Hosted on [Neon.tech](https://neon.tech/) for scalable database management.  
- **Prisma**: As the ORM to interact with the database and define schemas.  
- **Node.js**: For server-side functionality and API development.  

---

## 🛠️ Implementation Details

### Database
- The database schema is defined using Prisma.  
- Tables include:
  - `Company`: Contains information about the company, including its name, establishment date, and description.  
  - `Director`: Stores details about company directors.  

### API Endpoints
- `/api/companies`: Fetches the list of all companies.  
- `/api/company/[id]`: Fetches details of a specific company and its directors.  

### Rendering Methods
- **SSR**: Ensures that dynamic data is always fresh and updated when pages are requested.  
- **SSG**: Pre-renders pages at build time to reduce load times and enhance performance for static content.  

---

## 🖌️ Design Notes

### Challenges with Provided Design
- The provided design specifications did not match the project requirements and task descriptions.  
- To address this, I incorporated elements from my own website's design, ensuring the application was visually appealing, responsive, and functional.  

### Design Implementation
- Consistent layout and color scheme using Tailwind CSS.  
- Fully responsive pages optimized for both desktop and mobile devices.  
- Enhanced the user interface for better usability and aesthetics.  

---

## 📝 Assessment Notes

- The assignment was completed with full functionality and design improvements.  
- APIs are fully implemented and tested.  
- Pages render the required data efficiently using a combination of SSR and SSG.  

Despite the initial mismatches in the provided design, I focused on delivering a **complete and high-quality implementation** within the given timeline.

---

## 📂 How to Run the Project

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/company-directory.git
   cd company-directory
