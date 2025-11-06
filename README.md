# RxDecode

**RxDecode** is an AI-powered medical prescription generator built using **Gemini**, designed to simplify and enhance the understanding of prescriptions. The application can generate detailed medicine recommendations based on user input and provides complete information about each medicine, including **usage, dosage, precautions, and warnings**.

In addition, RxDecode includes a **search feature** that allows users to look up any medicine and instantly access verified and comprehensive details.

---

## Features

- **AI Prescription Generator:**  
  Generates a detailed list of medicines based on the given symptoms or condition using the Gemini model.

- **Medicine Details:**  
  For every generated or searched medicine, users can view essential details such as:
  - Usage instructions  
  - Recommended dosage  
  - Possible side effects  
  - Precautions and warnings  

- **Search Functionality:**  
  Search for any medicine by name to view accurate and structured information about it.

- **User-Friendly Interface:**  
  A clean and intuitive interface that helps users easily understand and navigate through the app.

- **Educational Purpose:**  
  Designed to help users understand medical prescriptions better. It is **not a replacement for professional medical advice**.

---

## Tech Stack

- **Frontend:** React / Next.js  
- **Backend:** Node.js / Express (if applicable)  
- **AI Model:** Gemini (for prescription and medicine information generation)  
- **Styling:** Tailwind CSS / ShadCN UI  
- **Deployment:** Vercel / Render / Other supported platforms  

---

## How It Works

1. **Input Symptoms or Condition:**  
   Enter the symptoms or health issue you are facing.

2. **AI Prescription Generation:**  
   Gemini processes the input and generates a list of suggested medicines.

3. **View Details:**  
   Each medicine includes information such as how to use it, dosage instructions, and precautions.

4. **Search Option:**  
   Alternatively, search for a specific medicine to get details directly.

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/rxdecode.git
   ```

2. **Create env file**
   Create a `.env` file at the project root with the following variables. For Vite, all client-exposed vars must be prefixed with `VITE_`.

   ```bash
   # Database
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-oauth-client-id.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

   # Frontend (Vite)
   VITE_GEMINI_API_KEY="your-gemini-api-key"
   VITE_GOOGLE_VISION_API_KEY="your-google-vision-api-key"
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run Prisma (if backend present)**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Start Dev Server**
   ```bash
   npm run dev
   ```
