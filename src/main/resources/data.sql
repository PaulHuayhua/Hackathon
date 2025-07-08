INSERT INTO students (
    code, name, last_name, dni, gender, phone, email, address,
    department, province, district,
    academic_program, academic_cycle, date_registration, state
)
VALUES 
-- Estudiante 1
('A001', 'Carlos', 'Gómez Ruiz', '71234567', 'M', '912345678', 'carlos.gomez@example.com', 'Av. Siempre Viva 123',
 'Lima', 'Lima', 'Miraflores', 'Ingeniería de Sistemas', 3, GETDATE(), 1),

-- Estudiante 2
('A002', 'Lucía', 'Martínez Pérez', '82345678', 'F', '922345678', 'lucia.martinez@example.com', 'Jr. Las Palmas 456',
 'Cusco', 'Cusco', 'Wanchaq', 'Administración de Empresas', 2, GETDATE(), 1),

-- Estudiante 3
('A003', 'Andrés', 'Torres Salazar', '63456789', 'M', '932345678', 'andres.torres@example.com', 'Calle Falsa 789',
 'Arequipa', 'Arequipa', 'Cayma', 'Contabilidad', 4, GETDATE(), 1);
