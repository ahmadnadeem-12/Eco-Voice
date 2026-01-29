# 🌿 EcoVoice - AI-Powered Environmental Reporter

**EcoVoice** is a modern, accessible platform designed to empower underserved communities to report environmental issues like illegal dumping, water pollution, and illegal logging. By removing accessibility barriers—such as low literacy and complex forms—EcoVoice ensures that every voice can be heard in the fight for environmental protection.

## 🚀 Key Features

*   **Voice-to-Report**: Report environmental harm using voice recordings in local languages (Filipino, Cebuano, etc.).
*   **AI Verification**: Automated analysis of reports using AI to transcribe voice, verify photos, and cross-reference locations.
*   **Trust Scoring**: Generates a reliability score for each report to help authorities prioritize urgent cases.
*   **Direct Routing**: Seamlessly connects reporters with LGUs, DENR-type departments, and partner NGOs.
*   **Real-time Updates**: Reporters receive SMS notifications about the progress of their reports.
*   **Modern UI/UX**: A sleek, responsive design with full **Dark Mode** support and glassmorphism aesthetics.

## 🚀 How It Works

1.  **Report**: Click "Report Now" and upload a photo or record your voice describing the issue.
2.  **Analyze**: Our AI engine processes the input, classifies the incident, and verifies the evidence.
3.  **Verify**: The report is cross-referenced with satellite data and assigned a trust score.
4.  **Act**: Verified reports are instantly routed to the correct government office or NGO for action.

## 🛠️ Tech Stack

### **Frontend**
- **React.js** (v18)
- **Vite** (Next-gen frontend tool)
- **Tailwind CSS** (Utility-first CSS framework)
- **Lucide React** (Beautifully simple icons)
- **TypeScript** (Typed JavaScript)
- **React Router Dom** (Client-side routing)

### **Backend**
- **FastAPI** (Python)
- **AI/ML** (Integrated transcription and image analysis)

---

## 💻 Getting Started

Follow these steps to get the project running locally.

### **Prerequisites**
- **Node.js**: [Install Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- **npm**: Comes with Node.js

### **Installation**

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/ecovoice.git
    cd EcoVoice
    ```

2.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    The application will be running at `http://localhost:5173`.

3.  **Backend Setup** (Optional/Secondary)
    *Note: If you have a backend directory, follow these steps.*
    ```bash
    # Navigate to backend (if exists)
    cd backend
    python -m venv .venv
    # Activate on Windows: .venv\Scripts\activate
    # Activate on Unix: source .venv/bin/activate
    pip install -r requirements.txt
    python main.py
    ```

---

## 📂 Project Structure

```text
EcoVoice/
├── frontend/           # React + Vite application
│   ├── src/            # Source code
│   │   ├── admin/      # Admin dashboard components
│   │   ├── pages/      # Main application pages
│   │   ├── components/ # Reusable UI components
│   │   └── App.tsx     # Main application logic
│   └── ...
├── .venv/              # Python virtual environment
├── .gitignore          # Git exclusion rules
└── README.md           # Project documentation
```

## 🌑 Theme Support
EcoVoice supports both **Light** and **Dark** modes. The preference is saved locally to provide a consistent user experience.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing
We welcome contributions! Please feel free to submit a Pull Request.

---
*Built with ❤️ for a greener planet.*
