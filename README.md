# Resume Canvas

**Resume Canvas** is a dynamic and intuitive resume builder made with **React**, designed to help developers and professionals create, edit, and manage multiple resumes with ease. It provides a real-time preview of your resume as you edit various sections, ensuring a seamless experience from input to output.

![Resume Canvas Preview](/src/assets/images/2.png)

## Features

- **Multi-Resume Management**: Switch between multiple resume slots with ease.
- **Live Editing Interface**:
  - **Personal Details**: Full name, GitHub, LinkedIn, email, phone number, address, personal website.
  - **About Me**: A concise personal bio.
  - **Education**: Academic background.
  - **Additional**: Unique talents, certifications, or other highlights.
  - **Skills**: Categorized into technical, frontend, and backend.
  - **Work Experience**: Job roles, accomplishments, and timelines.
  - **Projects**: Showcase major projects with descriptions and links.
- **Real-Time Preview**: View your resume update instantly as you edit.
- **LocalStorage Support**: Your changes persist between sessions and page reloads.
- **Templates & Management Options**:
  - Add a **clean template**.
  - Load an **example template**.
  - **Duplicate** an existing resume.
  - **Clear** current content.
  - **Delete** active resume slot.
- **Flexible Editor**:
  - Hide or reveal individual sections.
  - Collapse or expand sections for convenience.

## Tech Stack

- **React**
- **ModularCSS**
- **Javascript**
- **HTML**
- **LocalStorage API**

## 

## Installation

Follow these steps to get **Resume Canvas** running locally on your machine:

### 1. Clone the Repository

```bash
git clone https://github.com/ShivaneRana/Resume-Canvas.git
cd Resume-Canvas
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev 
```

This will launch the app in your browser at [http://localhost:3000](http://localhost:3000).

### 4. Build for Production

To create an optimized production build:

```bash
npm run build
```

This will generate static files in the `dist/` directory.