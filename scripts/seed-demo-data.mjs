/**
 * Proper schema for every project. Each project gets the fields its real
 * application would need — not generic placeholders.
 *
 * Run with: npm run seed:demo
 */

import { readFileSync } from "node:fs";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(readFileSync("serviceAccountKey.json", "utf8"));
if (!getApps().length) initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const cyan = (t) => `\x1b[36m${t}\x1b[0m`;
const dim = (t) => `\x1b[2m${t}\x1b[0m`;
const green = (t) => `\x1b[32m${t}\x1b[0m`;
const yellow = (t) => `\x1b[33m${t}\x1b[0m`;

// ─── Schema definitions ────────────────────────────────────────────────────
// Each project: subcollections with realistic fields for that domain.

const SCHEMA = {
  "ai-interview-simulator": {
    candidates: [
      { id: "c1", name: "Ali Khan", email: "ali.khan@mail.com", phone: "+92-300-1111111", experience: 3, role: "Frontend Developer", status: "active", registeredAt: "2026-06-10" },
      { id: "c2", name: "Sara Ahmed", email: "sara.a@mail.com", phone: "+92-321-2222222", experience: 5, role: "Backend Developer", status: "active", registeredAt: "2026-06-15" },
      { id: "c3", name: "Usman Tariq", email: "usman.t@mail.com", phone: "+92-333-3333333", experience: 1, role: "Junior Developer", status: "active", registeredAt: "2026-07-01" },
      { id: "c4", name: "Fatima Noor", email: "fatima.n@mail.com", phone: "+92-312-4444444", experience: 7, role: "Full Stack Developer", status: "active", registeredAt: "2026-07-05" },
      { id: "c5", name: "Hassan Raza", email: "hassan.r@mail.com", phone: "+92-345-5555555", experience: 2, role: "React Developer", status: "inactive", registeredAt: "2026-05-20" },
    ],
    questions: [
      { id: "q1", text: "Reverse a singly linked list", category: "Data Structures", difficulty: "medium", timeLimit: 25, points: 10, tags: ["linked-list", "pointers"], createdAt: "2026-01-10" },
      { id: "q2", text: "Explain closures and their use cases", category: "JavaScript", difficulty: "easy", timeLimit: 15, points: 5, tags: ["closures", "scope"], createdAt: "2026-01-12" },
      { id: "q3", text: "Design a URL shortener like bit.ly", category: "System Design", difficulty: "hard", timeLimit: 45, points: 20, tags: ["system-design", "scalability"], createdAt: "2026-01-15" },
      { id: "q4", text: "Find longest palindromic substring", category: "Algorithms", difficulty: "medium", timeLimit: 30, points: 10, tags: ["strings", "dp"], createdAt: "2026-02-01" },
      { id: "q5", text: "What is the event loop in JavaScript?", category: "JavaScript", difficulty: "easy", timeLimit: 10, points: 5, tags: ["async", "event-loop"], createdAt: "2026-02-05" },
      { id: "q6", text: "Implement a rate limiter for an API", category: "System Design", difficulty: "hard", timeLimit: 40, points: 20, tags: ["api", "rate-limiting"], createdAt: "2026-02-10" },
      { id: "q7", text: "Binary search tree validation", category: "Data Structures", difficulty: "medium", timeLimit: 20, points: 10, tags: ["bst", "recursion"], createdAt: "2026-02-15" },
    ],
    sessions: [
      { id: "s1", candidateId: "c1", candidateName: "Ali Khan", startedAt: "2026-07-15T10:00:00Z", completedAt: "2026-07-15T10:42:00Z", score: 78, maxScore: 100, status: "completed", questionsAttempted: 4, role: "Frontend Developer" },
      { id: "s2", candidateId: "c2", candidateName: "Sara Ahmed", startedAt: "2026-07-18T14:30:00Z", completedAt: "2026-07-18T15:15:00Z", score: 92, maxScore: 100, status: "completed", questionsAttempted: 5, role: "Backend Developer" },
      { id: "s3", candidateId: "c3", candidateName: "Usman Tariq", startedAt: "2026-08-01T09:00:00Z", completedAt: null, score: null, maxScore: 100, status: "in-progress", questionsAttempted: 2, role: "Junior Developer" },
      { id: "s4", candidateId: "c4", candidateName: "Fatima Noor", startedAt: "2026-08-05T11:15:00Z", completedAt: "2026-08-05T11:55:00Z", score: 65, maxScore: 100, status: "completed", questionsAttempted: 3, role: "Full Stack Developer" },
      { id: "s5", candidateId: "c1", candidateName: "Ali Khan", startedAt: "2026-08-07T10:00:00Z", completedAt: null, score: null, maxScore: 100, status: "scheduled", questionsAttempted: 0, role: "Frontend Developer" },
    ],
    feedback: [
      { id: "f1", sessionId: "s1", candidateId: "c1", technicalScore: 75, communicationScore: 80, recommendation: "hire", notes: "Strong fundamentals, good problem solving", reviewedBy: "Abdullah", createdAt: "2026-07-15T11:00:00Z" },
      { id: "f2", sessionId: "s2", candidateId: "c2", technicalScore: 95, communicationScore: 88, recommendation: "strong-hire", notes: "Excellent system design skills", reviewedBy: "Abdullah", createdAt: "2026-07-18T15:30:00Z" },
      { id: "f3", sessionId: "s4", candidateId: "c4", technicalScore: 60, communicationScore: 70, recommendation: "no-hire", notes: "Struggled with basic concepts", reviewedBy: "Abdullah", createdAt: "2026-08-05T12:00:00Z" },
    ],
  },

  "gamevault-pro": {
    games: [
      { id: "g1", title: "Cyberpunk 2077", developer: "CD Projekt Red", publisher: "CD Projekt", genre: "Action RPG", platform: ["PC", "PS5", "Xbox"], price: 2999, rating: 4.5, releaseDate: "2020-12-10", stock: 120, description: "Open-world RPG set in Night City" },
      { id: "g2", title: "Elden Ring", developer: "FromSoftware", publisher: "Bandai Namco", genre: "Action RPG", platform: ["PC", "PS5", "Xbox"], price: 3499, rating: 4.9, releaseDate: "2022-02-25", stock: 85, description: "Open-world souls-like by Hidetaka Miyazaki" },
      { id: "g3", title: "Hades II", developer: "Supergiant Games", publisher: "Supergiant Games", genre: "Roguelike", platform: ["PC", "PS5"], price: 1999, rating: 4.7, releaseDate: "2024-05-06", stock: 200, description: "Sequel to the award-winning roguelike" },
      { id: "g4", title: "Baldur's Gate 3", developer: "Larian Studios", publisher: "Larian Studios", genre: "RPG", platform: ["PC", "PS5", "Xbox"], price: 2799, rating: 4.8, releaseDate: "2023-08-03", stock: 60, description: "D&D based RPG with deep storytelling" },
      { id: "g5", title: "Hollow Knight: Silksong", developer: "Team Cherry", publisher: "Team Cherry", genre: "Metroidvania", platform: ["PC", "Switch"], price: 1499, rating: null, releaseDate: null, stock: 0, description: "Upcoming sequel to Hollow Knight", preOrder: true },
      { id: "g6", title: "Starfield", developer: "Bethesda", publisher: "Bethesda", genre: "Action RPG", platform: ["PC", "Xbox"], price: 3299, rating: 3.8, releaseDate: "2023-09-06", stock: 45, description: "Space exploration RPG" },
    ],
    users: [
      { id: "u1", username: "GamerPro99", email: "gamer@mail.com", wallet: 5000, joinedAt: "2025-01-15", totalPurchases: 12 },
      { id: "u2", username: "PixelQueen", email: "pixel@mail.com", wallet: 3200, joinedAt: "2025-03-22", totalPurchases: 8 },
      { id: "u3", username: "NoobSlayer", email: "noob@mail.com", wallet: 1500, joinedAt: "2026-02-10", totalPurchases: 3 },
      { id: "u4", username: "RetroFan", email: "retro@mail.com", wallet: 8000, joinedAt: "2024-11-05", totalPurchases: 25 },
    ],
    reviews: [
      { id: "r1", gameId: "g1", userId: "u1", rating: 4, title: "Amazing world", body: "Night City feels alive. Story is incredible.", helpful: 12, date: "2026-06-10" },
      { id: "r2", gameId: "g2", userId: "u2", rating: 5, title: "Masterpiece", body: "Best souls-like ever made. Open world is vast.", helpful: 28, date: "2026-07-22" },
      { id: "r3", gameId: "g4", userId: "u4", rating: 5, title: "Best RPG in years", body: "Larian outdid themselves. Endless replayability.", helpful: 35, date: "2026-08-01" },
      { id: "r4", gameId: "g2", userId: "u3", rating: 4, title: "Challenging but fair", body: "Took me 80 hours. Worth every minute.", helpful: 8, date: "2026-07-30" },
      { id: "r5", gameId: "g3", userId: "u1", rating: 5, title: "Supergiant never misses", body: "Even better than the first one.", helpful: 15, date: "2026-06-20" },
    ],
    purchases: [
      { id: "p1", userId: "u1", gameId: "g1", amount: 2999, method: "wallet", date: "2026-06-10" },
      { id: "p2", userId: "u2", gameId: "g2", amount: 3499, method: "card", date: "2026-07-22" },
      { id: "p3", userId: "u4", gameId: "g4", amount: 2799, method: "wallet", date: "2026-08-01" },
      { id: "p4", userId: "u1", gameId: "g3", amount: 1999, method: "wallet", date: "2026-06-20" },
    ],
  },

  "hospital-erp": {
    patients: [
      { id: "p1", name: "Ayesha Malik", age: 34, gender: "Female", bloodGroup: "A+", phone: "+92-300-1234567", email: "ayesha@mail.com", address: "Gulberg, Lahore", emergencyContact: "+92-300-7654321", registeredAt: "2025-03-10", insurance: "State Life", conditions: ["Asthma"] },
      { id: "p2", name: "Bilal Hussain", age: 56, gender: "Male", bloodGroup: "O-", phone: "+92-321-9876543", email: "bilal@mail.com", address: "DHA, Karachi", emergencyContact: "+92-321-1234567", registeredAt: "2024-08-15", insurance: "Adamjee", conditions: ["Diabetes", "Hypertension"] },
      { id: "p3", name: "Hira Saeed", age: 8, gender: "Female", bloodGroup: "B+", phone: "+92-333-5551234", email: null, address: "F-11, Islamabad", emergencyContact: "+92-333-5554321", registeredAt: "2026-01-20", insurance: null, conditions: [] },
      { id: "p4", name: "Rizwan Ahmed", age: 45, gender: "Male", bloodGroup: "AB+", phone: "+92-312-7778899", email: "rizwan@mail.com", address: "Model Town, Lahore", emergencyContact: "+92-312-7771122", registeredAt: "2025-11-05", insurance: "EFU", conditions: ["Arthritis"] },
      { id: "p5", name: "Nadia Pervez", age: 67, gender: "Female", bloodGroup: "A-", phone: "+92-345-2223344", email: "nadia@mail.com", address: "Clifton, Karachi", emergencyContact: "+92-345-2225566", registeredAt: "2024-05-12", insurance: "State Life", conditions: ["Heart Disease", "Osteoporosis"] },
      { id: "p6", name: "Faisal Khan", age: 29, gender: "Male", bloodGroup: "O+", phone: "+92-300-4445566", email: "faisal@mail.com", address: "Bahria Town, Rawalpindi", emergencyContact: "+92-300-4447788", registeredAt: "2026-04-18", insurance: null, conditions: [] },
    ],
    doctors: [
      { id: "d1", name: "Dr. Saira Iqbal", specialization: "Cardiology", qualification: "MBBS, FCPS", phone: "+92-300-1112233", email: "saira@hospital.com", available: true, consultationFee: 2000, patientsPerDay: 20, joinDate: "2020-03-01" },
      { id: "d2", name: "Dr. Imran Shah", specialization: "Pediatrics", qualification: "MBBS, MCPS", phone: "+92-321-2223344", email: "imran@hospital.com", available: true, consultationFee: 1500, patientsPerDay: 25, joinDate: "2021-06-15" },
      { id: "d3", name: "Dr. Rabia Tanveer", specialization: "Orthopedics", qualification: "MBBS, FCPS", phone: "+92-333-3334455", email: "rabia@hospital.com", available: false, consultationFee: 2500, patientsPerDay: 15, joinDate: "2019-09-10" },
      { id: "d4", name: "Dr. Kamran Hassan", specialization: "General Medicine", qualification: "MBBS", phone: "+92-312-4445566", email: "kamran@hospital.com", available: true, consultationFee: 1000, patientsPerDay: 30, joinDate: "2022-01-20" },
      { id: "d5", name: "Dr. Naveed Akhtar", specialization: "Dermatology", qualification: "MBBS, FCPS", phone: "+92-345-5556677", email: "naveed@hospital.com", available: true, consultationFee: 1800, patientsPerDay: 18, joinDate: "2023-04-05" },
    ],
    appointments: [
      { id: "a1", patientId: "p1", patientName: "Ayesha Malik", doctorId: "d1", doctorName: "Dr. Saira Iqbal", date: "2026-08-10", time: "10:00", type: "follow-up", status: "scheduled", fee: 2000, notes: "Routine heart checkup" },
      { id: "a2", patientId: "p3", patientName: "Hira Saeed", doctorId: "d2", doctorName: "Dr. Imran Shah", date: "2026-08-10", time: "11:30", type: "consultation", status: "scheduled", fee: 1500, notes: "Fever and cough" },
      { id: "a3", patientId: "p5", patientName: "Nadia Pervez", doctorId: "d1", doctorName: "Dr. Saira Iqbal", date: "2026-08-09", time: "09:00", type: "follow-up", status: "completed", fee: 2000, notes: "Blood pressure stable" },
      { id: "a4", patientId: "p2", patientName: "Bilal Hussain", doctorId: "d4", doctorName: "Dr. Kamran Hassan", date: "2026-08-11", time: "14:00", type: "consultation", status: "scheduled", fee: 1000, notes: "Diabetes management" },
      { id: "a5", patientId: "p4", patientName: "Rizwan Ahmed", doctorId: "d3", doctorName: "Dr. Rabia Tanveer", date: "2026-08-12", time: "16:00", type: "consultation", status: "scheduled", fee: 2500, notes: "Knee pain" },
      { id: "a6", patientId: "p6", patientName: "Faisal Khan", doctorId: "d5", doctorName: "Dr. Naveed Akhtar", date: "2026-08-08", time: "10:30", type: "consultation", status: "completed", fee: 1800, notes: "Skin allergy" },
    ],
    bills: [
      { id: "b1", patientId: "p5", patientName: "Nadia Pervez", appointmentId: "a3", amount: 2000, paid: true, method: "card", date: "2026-08-09" },
      { id: "b2", patientId: "p6", patientName: "Faisal Khan", appointmentId: "a6", amount: 1800, paid: true, method: "cash", date: "2026-08-08" },
      { id: "b3", patientId: "p1", patientName: "Ayesha Malik", appointmentId: "a1", amount: 2000, paid: false, method: null, date: "2026-08-10" },
    ],
  },

  "multi-vendor-marketplace": {
    vendors: [
      { id: "v1", storeName: "TechZone", owner: "Hamza Ali", email: "hamza@techzone.com", phone: "+92-300-1111111", rating: 4.6, totalSales: 1240, totalRevenue: 2480000, joined: "2025-03-15", status: "active", category: "Electronics" },
      { id: "v2", storeName: "FashionHub", owner: "Mehreen Khan", email: "mehreen@fashionhub.com", phone: "+92-321-2222222", rating: 4.3, totalSales: 890, totalRevenue: 1335000, joined: "2025-06-20", status: "active", category: "Clothing" },
      { id: "v3", storeName: "HomeDecor Pro", owner: "Tariq Mehmood", email: "tariq@homedecor.com", phone: "+92-333-3333333", rating: 4.8, totalSales: 2100, totalRevenue: 3150000, joined: "2024-11-01", status: "active", category: "Home & Living" },
      { id: "v4", storeName: "GroceryExpress", owner: "Noreen Akhtar", email: "noreen@grocery.com", phone: "+92-312-4444444", rating: 4.1, totalSales: 3400, totalRevenue: 1700000, joined: "2025-01-10", status: "active", category: "Grocery" },
      { id: "v5", storeName: "BookWorld", owner: "Sajid Raza", email: "sajid@bookworld.com", phone: "+92-345-5555555", rating: 4.7, totalSales: 560, totalRevenue: 448000, joined: "2025-08-01", status: "pending", category: "Books" },
    ],
    products: [
      { id: "pr1", vendorId: "v1", vendorName: "TechZone", name: "Wireless Earbuds Pro", description: "ANC, 30hr battery", price: 2499, cost: 1800, stock: 50, category: "Electronics", rating: 4.5, totalSold: 320, addedAt: "2025-04-10" },
      { id: "pr2", vendorId: "v2", vendorName: "FashionHub", name: "Summer Kurti Collection", description: "Cotton, printed", price: 1299, cost: 600, stock: 200, category: "Clothing", rating: 4.2, totalSold: 450, addedAt: "2025-07-01" },
      { id: "pr3", vendorId: "v3", vendorName: "HomeDecor Pro", name: "Modern Wall Clock", description: "Silent movement, 12 inch", price: 1899, cost: 900, stock: 30, category: "Home", rating: 4.8, totalSold: 180, addedAt: "2025-01-15" },
      { id: "pr4", vendorId: "v1", vendorName: "TechZone", name: "USB-C 7-in-1 Hub", description: "HDMI, USB3, SD card", price: 3199, cost: 2200, stock: 15, category: "Electronics", rating: 4.4, totalSold: 95, addedAt: "2025-09-20" },
      { id: "pr5", vendorId: "v4", vendorName: "GroceryExpress", name: "Organic Honey 1kg", description: "Pure forest honey", price: 999, cost: 650, stock: 100, category: "Grocery", rating: 4.6, totalSold: 890, addedAt: "2025-02-10" },
      { id: "pr6", vendorId: "v2", vendorName: "FashionHub", name: "Denim Jacket", description: "Unisex, vintage wash", price: 2799, cost: 1400, stock: 75, category: "Clothing", rating: 4.3, totalSold: 210, addedAt: "2025-10-05" },
    ],
    orders: [
      { id: "o1", productId: "pr1", productName: "Wireless Earbuds Pro", vendorId: "v1", customerName: "Ali Raza", customerEmail: "ali@mail.com", quantity: 2, unitPrice: 2499, total: 4998, status: "delivered", paymentMethod: "card", date: "2026-07-28", address: "Gulberg, Lahore" },
      { id: "o2", productId: "pr3", productName: "Modern Wall Clock", vendorId: "v3", customerName: "Sana Malik", customerEmail: "sana@mail.com", quantity: 1, unitPrice: 1899, total: 1899, status: "shipped", paymentMethod: "cod", date: "2026-08-05", address: "DHA, Karachi" },
      { id: "o3", productId: "pr5", productName: "Organic Honey 1kg", vendorId: "v4", customerName: "Omar Farooq", customerEmail: "omar@mail.com", quantity: 3, unitPrice: 999, total: 2997, status: "processing", paymentMethod: "wallet", date: "2026-08-07", address: "F-11, Islamabad" },
      { id: "o4", productId: "pr2", productName: "Summer Kurti Collection", vendorId: "v2", customerName: "Hina Tariq", customerEmail: "hina@mail.com", quantity: 1, unitPrice: 1299, total: 1299, status: "delivered", paymentMethod: "card", date: "2026-08-01", address: "Model Town, Lahore" },
      { id: "o5", productId: "pr4", productName: "USB-C 7-in-1 Hub", vendorId: "v1", customerName: "Zainab Fatima", customerEmail: "zainab@mail.com", quantity: 1, unitPrice: 3199, total: 3199, status: "pending", paymentMethod: "cod", date: "2026-08-08", address: "Bahria Town, Rawalpindi" },
    ],
  },

  "next-build": {
    projects: [
      { id: "np1", name: "E-commerce Platform", description: "Multi-vendor marketplace", status: "active", startDate: "2026-08-01", endDate: null, budget: 500000, progress: 35 },
      { id: "np2", name: "Portfolio Site", description: "Personal portfolio with CMS", status: "completed", startDate: "2026-05-01", endDate: "2026-06-15", budget: 50000, progress: 100 },
      { id: "np3", name: "Task Manager App", description: "Team productivity tool", status: "planning", startDate: null, endDate: null, budget: 200000, progress: 0 },
    ],
    tasks: [
      { id: "t1", projectId: "np1", title: "Setup project scaffolding", description: "Next.js + TypeScript + Tailwind", status: "done", priority: "high", assignee: "Abdullah", estimatedHours: 8, actualHours: 6, dueDate: "2026-08-03" },
      { id: "t2", projectId: "np1", title: "Design database schema", description: "Firestore collections and rules", status: "done", priority: "high", assignee: "Abdullah", estimatedHours: 12, actualHours: 14, dueDate: "2026-08-05" },
      { id: "t3", projectId: "np1", title: "Implement auth flow", description: "Email + Google OAuth", status: "in-progress", priority: "high", assignee: "Abdullah", estimatedHours: 16, actualHours: 10, dueDate: "2026-08-10" },
      { id: "t4", projectId: "np1", title: "Build dashboard UI", description: "Charts, tables, filters", status: "todo", priority: "medium", assignee: "Team", estimatedHours: 24, actualHours: 0, dueDate: "2026-08-15" },
      { id: "t5", projectId: "np1", title: "Write API endpoints", description: "RESTful CRUD for all resources", status: "todo", priority: "medium", assignee: "Abdullah", estimatedHours: 20, actualHours: 0, dueDate: "2026-08-18" },
      { id: "t6", projectId: "np1", title: "Add unit tests", description: "Jest + React Testing Library", status: "todo", priority: "low", assignee: null, estimatedHours: 16, actualHours: 0, dueDate: "2026-08-22" },
      { id: "t7", projectId: "np1", title: "Deploy to production", description: "Vercel + custom domain", status: "todo", priority: "high", assignee: "Abdullah", estimatedHours: 4, actualHours: 0, dueDate: "2026-08-25" },
    ],
    sprints: [
      { id: "sp1", projectId: "np1", name: "Sprint 1 - Foundation", goal: "Auth + DB + Scaffold", start: "2026-08-01", end: "2026-08-14", status: "active", tasksCompleted: 2, tasksTotal: 3 },
      { id: "sp2", projectId: "np1", name: "Sprint 2 - Core Features", goal: "Dashboard + API", start: "2026-08-15", end: "2026-08-28", status: "planned", tasksCompleted: 0, tasksTotal: 4 },
    ],
    team: [
      { id: "tm1", name: "Abdullah Khatri", role: "Lead Developer", email: "abdullah@mail.com", joinedAt: "2026-08-01", capacity: 40 },
      { id: "tm2", name: "Ayesha Siddiqui", role: "UI/UX Designer", email: "ayesha@mail.com", joinedAt: "2026-08-01", capacity: 30 },
      { id: "tm3", name: "Hassan Raza", role: "Backend Developer", email: "hassan@mail.com", joinedAt: "2026-08-05", capacity: 40 },
    ],
  },

  shopsphere: {
    products: [
      { id: "p1", name: "Premium Wireless Headphones", description: "ANC, 40hr battery", price: 4999, cost: 2800, category: "Electronics", stock: 45, sku: "SS-HD-001", rating: 4.6, totalSold: 230, addedAt: "2025-06-10" },
      { id: "p2", name: "Running Shoes Pro", description: "Lightweight, cushioned", price: 3499, cost: 1800, category: "Sports", stock: 80, sku: "SS-RS-002", rating: 4.4, totalSold: 180, addedAt: "2025-07-15" },
      { id: "p3", name: "Travel Backpack 40L", description: "Water resistant, laptop compartment", price: 2799, cost: 1200, category: "Bags", stock: 120, sku: "SS-BP-003", rating: 4.7, totalSold: 310, addedAt: "2025-04-20" },
      { id: "p4", name: "Smart Watch S2", description: "Heart rate, GPS, 7-day battery", price: 8999, cost: 5200, category: "Electronics", stock: 30, sku: "SS-SW-004", rating: 4.5, totalSold: 95, addedAt: "2025-09-01" },
      { id: "p5", name: "Yoga Mat Premium", description: "Non-slip, 6mm thick", price: 1499, cost: 600, category: "Sports", stock: 200, sku: "SS-YM-005", rating: 4.3, totalSold: 420, addedAt: "2025-03-05" },
      { id: "p6", name: "Insulated Water Bottle", description: "750ml, keeps cold 24hr", price: 799, cost: 300, category: "Accessories", stock: 350, sku: "SS-WB-006", rating: 4.8, totalSold: 560, addedAt: "2025-02-10" },
    ],
    customers: [
      { id: "c1", name: "Ahmed Raza", email: "ahmed@mail.com", phone: "+92-300-1111111", address: "Gulberg, Lahore", totalOrders: 12, totalSpent: 45000, joinedAt: "2025-09-10", lastOrder: "2026-08-05" },
      { id: "c2", name: "Zainab Fatima", email: "zainab@mail.com", phone: "+92-321-2222222", address: "DHA, Karachi", totalOrders: 5, totalSpent: 18000, joinedAt: "2026-01-22", lastOrder: "2026-07-28" },
      { id: "c3", name: "Kamran Yousaf", email: "kamran@mail.com", phone: "+92-333-3333333", address: "F-11, Islamabad", totalOrders: 8, totalSpent: 32000, joinedAt: "2025-11-05", lastOrder: "2026-08-01" },
      { id: "c4", name: "Sadia Noor", email: "sadia@mail.com", phone: "+92-312-4444444", address: "Model Town, Lahore", totalOrders: 3, totalSpent: 9500, joinedAt: "2026-05-18", lastOrder: "2026-07-15" },
      { id: "c5", name: "Tariq Hussain", email: "tariq@mail.com", phone: "+92-345-5555555", address: "Clifton, Karachi", totalOrders: 15, totalSpent: 62000, joinedAt: "2025-04-12", lastOrder: "2026-08-07" },
    ],
    orders: [
      { id: "or1", customerId: "c1", customerName: "Ahmed Raza", items: [{ productId: "p1", name: "Premium Wireless Headphones", qty: 1, price: 4999 }, { productId: "p4", name: "Smart Watch S2", qty: 1, price: 8999 }], subtotal: 13998, shipping: 200, total: 14198, status: "delivered", paymentMethod: "card", date: "2026-07-30", address: "Gulberg, Lahore" },
      { id: "or2", customerId: "c2", customerName: "Zainab Fatima", items: [{ productId: "p2", name: "Running Shoes Pro", qty: 1, price: 3499 }], subtotal: 3499, shipping: 150, total: 3649, status: "shipped", paymentMethod: "cod", date: "2026-08-06", address: "DHA, Karachi" },
      { id: "or3", customerId: "c3", customerName: "Kamran Yousaf", items: [{ productId: "p3", name: "Travel Backpack 40L", qty: 1, price: 2799 }, { productId: "p5", name: "Yoga Mat Premium", qty: 1, price: 1499 }, { productId: "p6", name: "Insulated Water Bottle", qty: 1, price: 799 }], subtotal: 5097, shipping: 150, total: 5247, status: "processing", paymentMethod: "card", date: "2026-08-07", address: "F-11, Islamabad" },
      { id: "or4", customerId: "c1", customerName: "Ahmed Raza", items: [{ productId: "p6", name: "Insulated Water Bottle", qty: 2, price: 799 }], subtotal: 1598, shipping: 100, total: 1698, status: "delivered", paymentMethod: "wallet", date: "2026-08-02", address: "Gulberg, Lahore" },
      { id: "or5", customerId: "c5", customerName: "Tariq Hussain", items: [{ productId: "p4", name: "Smart Watch S2", qty: 1, price: 8999 }], subtotal: 8999, shipping: 200, total: 9199, status: "pending", paymentMethod: "cod", date: "2026-08-08", address: "Clifton, Karachi" },
    ],
  },

  "shopverse-ecommerce": {
    products: [
      { id: "p1", name: "Bluetooth Speaker X", description: "20W, waterproof IPX7", price: 3299, cost: 1700, category: "Audio", stock: 60, sku: "SV-BT-001", rating: 4.5, totalSold: 185, addedAt: "2025-05-10" },
      { id: "p2", name: "Gaming Mouse RGB", description: "16000 DPI, 7 buttons", price: 2499, cost: 1200, category: "Gaming", stock: 90, sku: "SV-GM-002", rating: 4.3, totalSold: 220, addedAt: "2025-06-15" },
      { id: "p3", name: "Aluminum Laptop Stand", description: "Adjustable, foldable", price: 1999, cost: 800, category: "Accessories", stock: 150, sku: "SV-LS-003", rating: 4.6, totalSold: 340, addedAt: "2025-03-20" },
      { id: "p4", name: "Phone Case Clear", description: "Shockproof, anti-yellow", price: 599, cost: 150, category: "Mobile", stock: 500, sku: "SV-PC-004", rating: 4.1, totalSold: 890, addedAt: "2025-01-05" },
      { id: "p5", name: "LED Desk Lamp", description: "Touch control, 3 modes", price: 2199, cost: 1000, category: "Home", stock: 75, sku: "SV-DL-005", rating: 4.4, totalSold: 150, addedAt: "2025-08-01" },
    ],
    customers: [
      { id: "c1", name: "Usama Tariq", email: "usama@mail.com", phone: "+92-300-1111111", address: "Gulberg, Lahore", totalOrders: 7, totalSpent: 21000, joinedAt: "2025-08-14", lastOrder: "2026-08-04" },
      { id: "c2", name: "Rabia Khalid", email: "rabia@mail.com", phone: "+92-321-2222222", address: "DHA, Karachi", totalOrders: 4, totalSpent: 12000, joinedAt: "2026-02-28", lastOrder: "2026-08-07" },
      { id: "c3", name: "Danish Ali", email: "danish@mail.com", phone: "+92-333-3333333", address: "F-11, Islamabad", totalOrders: 15, totalSpent: 58000, joinedAt: "2025-05-09", lastOrder: "2026-08-01" },
    ],
    orders: [
      { id: "or1", customerId: "c3", customerName: "Danish Ali", items: [{ productId: "p1", name: "Bluetooth Speaker X", qty: 1, price: 3299 }, { productId: "p2", name: "Gaming Mouse RGB", qty: 1, price: 2499 }], subtotal: 5798, shipping: 150, total: 5948, status: "delivered", paymentMethod: "card", date: "2026-07-25", address: "F-11, Islamabad" },
      { id: "or2", customerId: "c1", customerName: "Usama Tariq", items: [{ productId: "p4", name: "Phone Case Clear", qty: 1, price: 599 }], subtotal: 599, shipping: 100, total: 699, status: "shipped", paymentMethod: "cod", date: "2026-08-04", address: "Gulberg, Lahore" },
      { id: "or3", customerId: "c2", customerName: "Rabia Khalid", items: [{ productId: "p3", name: "Aluminum Laptop Stand", qty: 1, price: 1999 }, { productId: "p5", name: "LED Desk Lamp", qty: 1, price: 2199 }], subtotal: 4198, shipping: 150, total: 4348, status: "processing", paymentMethod: "card", date: "2026-08-07", address: "DHA, Karachi" },
      { id: "or4", customerId: "c3", customerName: "Danish Ali", items: [{ productId: "p4", name: "Phone Case Clear", qty: 3, price: 599 }], subtotal: 1797, shipping: 100, total: 1897, status: "delivered", paymentMethod: "wallet", date: "2026-08-01", address: "F-11, Islamabad" },
    ],
  },

  "university-management-system": {
    students: [
      { id: "s1", name: "Abdullah Khatri", rollNo: "CS-2021-045", department: "Computer Science", program: "BSCS", semester: 7, gpa: 3.45, email: "abdullah@uni.edu", phone: "+92-300-1234567", address: "Lahore", admissionDate: "2021-09-01", status: "active", credits: 110 },
      { id: "s2", name: "Ayesha Siddiqui", rollNo: "CS-2021-012", department: "Computer Science", program: "BSCS", semester: 7, gpa: 3.82, email: "ayesha@uni.edu", phone: "+92-321-2345678", address: "Karachi", admissionDate: "2021-09-01", status: "active", credits: 112 },
      { id: "s3", name: "Hassan Raza", rollNo: "EE-2022-078", department: "Electrical Engineering", program: "BSEE", semester: 5, gpa: 3.12, email: "hassan@uni.edu", phone: "+92-333-3456789", address: "Islamabad", admissionDate: "2022-09-01", status: "active", credits: 82 },
      { id: "s4", name: "Maryam Nawaz", rollNo: "BA-2023-021", department: "Business Administration", program: "BBA", semester: 3, gpa: 3.67, email: "maryam@uni.edu", phone: "+92-312-4567890", address: "Lahore", admissionDate: "2023-09-01", status: "active", credits: 54 },
      { id: "s5", name: "Taimoor Shah", rollNo: "CS-2022-103", department: "Computer Science", program: "BSCS", semester: 5, gpa: 2.98, email: "taimoor@uni.edu", phone: "+92-345-5678901", address: "Rawalpindi", admissionDate: "2022-09-01", status: "probation", credits: 78 },
      { id: "s6", name: "Noor ul Huda", rollNo: "ME-2021-055", department: "Mechanical Engineering", program: "BSME", semester: 7, gpa: 3.55, email: "noor@uni.edu", phone: "+92-300-6789012", address: "Faisalabad", admissionDate: "2021-09-01", status: "active", credits: 108 },
    ],
    faculty: [
      { id: "f1", name: "Dr. Saira Iqbal", department: "Computer Science", designation: "Associate Professor", email: "saira@uni.edu", phone: "+92-300-1112233", specialization: "Algorithms", joinDate: "2015-03-01" },
      { id: "f2", name: "Dr. Imran Shah", department: "Computer Science", designation: "Assistant Professor", email: "imran@uni.edu", phone: "+92-321-2223344", specialization: "Databases", joinDate: "2018-09-01" },
      { id: "f3", name: "Dr. Rabia Tanveer", department: "Computer Science", designation: "Professor", email: "rabia@uni.edu", phone: "+92-333-3334455", specialization: "Operating Systems", joinDate: "2010-01-15" },
      { id: "f4", name: "Dr. Kamran Hassan", department: "Computer Science", designation: "Lecturer", email: "kamran@uni.edu", phone: "+92-312-4445566", specialization: "Machine Learning", joinDate: "2022-06-01" },
      { id: "f5", name: "Dr. Faisal Mehmood", department: "Electrical Engineering", designation: "Associate Professor", email: "faisal@uni.edu", phone: "+92-345-5556677", specialization: "Power Systems", joinDate: "2016-08-01" },
    ],
    courses: [
      { id: "co1", code: "CS301", name: "Data Structures & Algorithms", credits: 3, type: "core", department: "Computer Science", instructorId: "f1", instructorName: "Dr. Saira Iqbal", semester: "Fall 2026", enrolled: 45, capacity: 50 },
      { id: "co2", code: "CS401", name: "Database Systems", credits: 4, type: "core", department: "Computer Science", instructorId: "f2", instructorName: "Dr. Imran Shah", semester: "Fall 2026", enrolled: 38, capacity: 45 },
      { id: "co3", code: "CS501", name: "Operating Systems", credits: 3, type: "core", department: "Computer Science", instructorId: "f3", instructorName: "Dr. Rabia Tanveer", semester: "Fall 2026", enrolled: 42, capacity: 50 },
      { id: "co4", code: "CS601", name: "Machine Learning", credits: 3, type: "elective", department: "Computer Science", instructorId: "f4", instructorName: "Dr. Kamran Hassan", semester: "Fall 2026", enrolled: 30, capacity: 35 },
      { id: "co5", code: "EE201", name: "Circuit Analysis", credits: 4, type: "core", department: "Electrical Engineering", instructorId: "f5", instructorName: "Dr. Faisal Mehmood", semester: "Fall 2026", enrolled: 28, capacity: 40 },
    ],
    enrolments: [
      { id: "e1", studentId: "s1", studentName: "Abdullah Khatri", courseId: "co1", courseName: "Data Structures & Algorithms", semester: "Fall 2025", grade: "A", status: "completed" },
      { id: "e2", studentId: "s1", studentName: "Abdullah Khatri", courseId: "co2", courseName: "Database Systems", semester: "Fall 2025", grade: "B+", status: "completed" },
      { id: "e3", studentId: "s2", studentName: "Ayesha Siddiqui", courseId: "co1", courseName: "Data Structures & Algorithms", semester: "Fall 2025", grade: "A+", status: "completed" },
      { id: "e4", studentId: "s3", studentName: "Hassan Raza", courseId: "co5", courseName: "Circuit Analysis", semester: "Spring 2026", grade: "B", status: "completed" },
      { id: "e5", studentId: "s4", studentName: "Maryam Nawaz", courseId: "co4", courseName: "Machine Learning", semester: "Spring 2026", grade: "A", status: "completed" },
      { id: "e6", studentId: "s5", studentName: "Taimoor Shah", courseId: "co2", courseName: "Database Systems", semester: "Fall 2025", grade: "C+", status: "completed" },
      { id: "e7", studentId: "s6", studentName: "Noor ul Huda", courseId: "co3", courseName: "Operating Systems", semester: "Spring 2026", grade: "A-", status: "completed" },
    ],
  },

  "world-explorer": {
    destinations: [
      { id: "d1", name: "Kyoto", country: "Japan", continent: "Asia", bestSeason: "Spring (Mar-May)", avgCost: 150000, currency: "PKR", rating: 4.8, description: "Ancient temples, cherry blossoms, traditional culture", highlights: ["Fushimi Inari", "Arashiyama", "Kinkaku-ji"], visaRequired: true },
      { id: "d2", name: "Santorini", country: "Greece", continent: "Europe", bestSeason: "Summer (Jun-Sep)", avgCost: 200000, currency: "PKR", rating: 4.7, description: "White buildings, blue domes, stunning sunsets", highlights: ["Oia", "Red Beach", "Akrotiri"], visaRequired: true },
      { id: "d3", name: "Machu Picchu", country: "Peru", continent: "South America", bestSeason: "Autumn (Apr-Oct)", avgCost: 180000, currency: "PKR", rating: 4.9, description: "Ancient Incan city in the Andes mountains", highlights: ["Sun Gate", "Huayna Picchu", "Temple of the Sun"], visaRequired: true },
      { id: "d4", name: "Marrakech", country: "Morocco", continent: "Africa", bestSeason: "Spring (Mar-May)", avgCost: 95000, currency: "PKR", rating: 4.5, description: "Vibrant souks, palaces, and gardens", highlights: ["Jemaa el-Fnaa", "Majorelle Garden", "Bahia Palace"], visaRequired: false },
      { id: "d5", name: "Bali", country: "Indonesia", continent: "Asia", bestSeason: "Summer (Apr-Oct)", avgCost: 85000, currency: "PKR", rating: 4.6, description: "Temples, rice terraces, beaches", highlights: ["Ubud", "Tanah Lot", "Uluwatu"], visaRequired: false },
      { id: "d6", name: "Reykjavik", country: "Iceland", continent: "Europe", bestSeason: "Winter (Nov-Mar)", avgCost: 250000, currency: "PKR", rating: 4.8, description: "Northern lights, geysers, waterfalls", highlights: ["Blue Lagoon", "Golden Circle", "Northern Lights"], visaRequired: true },
    ],
    travelers: [
      { id: "tr1", name: "Ali Hassan", email: "ali@mail.com", phone: "+92-300-1111111", passport: "AB1234567", nationality: "Pakistani", totalTrips: 3, joinedAt: "2025-06-10" },
      { id: "tr2", name: "Sara Qureshi", email: "sara@mail.com", phone: "+92-321-2222222", passport: "CD7654321", nationality: "Pakistani", totalTrips: 5, joinedAt: "2024-11-15" },
      { id: "tr3", name: "Omar Sheikh", email: "omar@mail.com", phone: "+92-333-3333333", passport: "EF9876543", nationality: "Pakistani", totalTrips: 2, joinedAt: "2026-01-20" },
      { id: "tr4", name: "Hina Malik", email: "hina@mail.com", phone: "+92-312-4444444", passport: "GH1122334", nationality: "Pakistani", totalTrips: 7, joinedAt: "2024-03-05" },
    ],
    trips: [
      { id: "t1", destinationId: "d1", destinationName: "Kyoto, Japan", travelerId: "tr1", travelerName: "Ali Hassan", startDate: "2026-03-20", endDate: "2026-03-28", duration: 8, status: "completed", totalCost: 155000, rating: 5, notes: "Cherry blossoms were amazing" },
      { id: "t2", destinationId: "d3", destinationName: "Machu Picchu, Peru", travelerId: "tr2", travelerName: "Sara Qureshi", startDate: "2026-09-05", endDate: "2026-09-12", duration: 7, status: "planned", totalCost: 180000, rating: null, notes: null },
      { id: "t3", destinationId: "d5", destinationName: "Bali, Indonesia", travelerId: "tr3", travelerName: "Omar Sheikh", startDate: "2026-08-15", endDate: "2026-08-22", duration: 7, status: "booked", totalCost: 85000, rating: null, notes: "First trip to Southeast Asia" },
      { id: "t4", destinationId: "d2", destinationName: "Santorini, Greece", travelerId: "tr4", travelerName: "Hina Malik", startDate: "2026-07-01", endDate: "2026-07-07", duration: 6, status: "completed", totalCost: 205000, rating: 5, notes: "Sunset at Oia was unforgettable" },
      { id: "t5", destinationId: "d4", destinationName: "Marrakech, Morocco", travelerId: "tr1", travelerName: "Ali Hassan", startDate: "2026-11-10", endDate: "2026-11-15", duration: 5, status: "planned", totalCost: 95000, rating: null, notes: null },
    ],
  },
};

// ─── Seed ───────────────────────────────────────────────────────────────────

let totalDocs = 0;
let totalSubcols = 0;

for (const [slug, subcollections] of Object.entries(SCHEMA)) {
  const projectRef = db.collection("projects").doc(slug);
  const projectSnap = await projectRef.get();

  if (!projectSnap.exists) {
    console.log(dim(`  skipping ${slug} — no portfolio card`));
    continue;
  }

  console.log(cyan(`\n${slug}`));

  for (const [subName, documents] of Object.entries(subcollections)) {
    totalSubcols++;
    const batch = db.batch();

    for (const doc of documents) {
      batch.set(projectRef.collection(subName).doc(doc.id), doc);
    }

    await batch.commit();
    totalDocs += documents.length;
    console.log(`  ${subName}: ${documents.length} documents`);
  }
}

console.log(green(`\n✓ Added ${totalDocs} documents across ${totalSubcols} subcollections.`));
console.log(dim("Check them at: https://console.firebase.google.com/project/myprojects-ebc25/firestore\n"));

process.exit(0);
