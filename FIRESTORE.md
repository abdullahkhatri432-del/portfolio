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

## Adding a new project

1. Add its portfolio card to `/projects` via `npm run add-project`.
2. If it has its own data, create subcollections under its document — never at
   the top level.
3. Update security rules so public data stays public and private data stays
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
```

Only the portfolio site reads `/projects` from the client. Everything else is
accessed server-side via the Admin SDK, which bypasses rules.
