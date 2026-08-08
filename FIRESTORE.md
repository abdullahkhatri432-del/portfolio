# Firestore structure

Every project in this Firebase instance lives as a document in the top-level
`projects` collection. A project that has its own application data keeps it in
**subcollections beneath its own document** — nothing belonging to one project
ever sits outside it.

```
/projects/{slug}                                  portfolio card (public)
/projects/{slug}/{collection}/{id}                app-specific data
```

## Example

```
/projects/university-management-system            title, description, image...
/projects/university-management-system/students/{id}
                                      /courses/{id}
                                      /enrolments/{id}

/projects/hospital-erp
/projects/hospital-erp/patients/{id}
/projects/hospital-erp/doctors/{id}
/projects/hospital-erp/appointments/{id}
```

## Authentication

Auth lives in two places:

- **Firebase Auth** — email + password, managed by Firebase.
- **Firestore `auth_users/{uid}`** — profile data (role, projectId, phone…).

A user's `projectId` ties them to a project; their `role` decides what they can
do within it.

```
/auth_users/{uid}        role, projectId, displayName, phone, status...
```

### Roles per project

| Project | Roles |
|---|---|
| ai-interview-simulator | candidate, admin |
| gamevault-pro | user, admin |
| hospital-erp | patient, doctor, admin |
| multi-vendor-marketplace | customer, vendor, admin |
| next-build | team-member, admin |
| shopsphere / shopverse | customer, admin |
| university-management-system | student, faculty, admin |
| world-explorer | traveler, admin |

## Adding a new project

1. Add its portfolio card to `/projects` via `npm run add-project`.
2. If it has its own data, create subcollections under its document — never at
   the top level.
3. Seed users with `npm run seed:auth`.
4. Update security rules so public data stays public and private data stays
   server-only.

## Security rules

```javascript
match /projects/{slug} {
  // Portfolio cards are world-readable.
  allow read: if true;

  // Application data beneath a project is server-only.
  allow write: if false;
}

match /projects/{slug}/{rest=**} {
  allow read, write: if false;
}

match /auth_users/{uid} {
  // Users can read/write their own profile only.
  allow read, write: if request.auth != null && request.auth.uid == uid;
}
```

Only the portfolio site reads `/projects` from the client. Everything else is
accessed server-side via the Admin SDK, which bypasses rules.
