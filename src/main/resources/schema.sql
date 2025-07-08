DROP TABLE IF EXISTS students;

CREATE TABLE students (
    identifier INT NOT NULL IDENTITY(1,1),
    code char(4) NOT NULL,
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    dni CHAR(8) NOT NULL,
    gender CHAR(1) NOT NULL,            -- 'M' o 'F'
    phone CHAR(9) NOT NULL,
    email VARCHAR(200) NOT NULL,
    address VARCHAR(200) NOT NULL,
    
    department VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    
    academic_program VARCHAR(150) NOT NULL,
    academic_cycle INT NOT NULL,
    date_registration DATE NOT NULL DEFAULT GETDATE(),
    state BIT NOT NULL DEFAULT 1,

    CONSTRAINT pk_students PRIMARY KEY (identifier),

    CONSTRAINT uq_students_dni UNIQUE (dni),
    CONSTRAINT uq_students_email UNIQUE (email),
    CONSTRAINT uq_students_name_last_name UNIQUE (name, last_name),
    CONSTRAINT uq_students_phone UNIQUE (phone),
    CONSTRAINT chk_gender_valid CHECK (gender IN ('M', 'F')),
    CONSTRAINT chk_phone_valid CHECK (phone LIKE '9[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
    CONSTRAINT chk_dni_valid CHECK (dni LIKE '[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
    CONSTRAINT chk_state_valid CHECK (state IN (0, 1)),
    CONSTRAINT chk_name_alpha CHECK (name LIKE '%[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]%'),
    CONSTRAINT chk_last_name_alpha CHECK (last_name LIKE '%[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]%')
);
