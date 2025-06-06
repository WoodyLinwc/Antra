// create a database in PostgreSQL

psql -U postgres
CREATE DATABASE checklist;
\q

// connects to the database
psql -U postgres -l
psql -U postgres -d checklist

\list

\dt

SELECT \* FROM "Checklists" LIMIT 10;
