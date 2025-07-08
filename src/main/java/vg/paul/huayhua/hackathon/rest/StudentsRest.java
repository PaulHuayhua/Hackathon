package vg.paul.huayhua.hackathon.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vg.paul.huayhua.hackathon.model.Student;
import vg.paul.huayhua.hackathon.service.StudentService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/v1/api/students", produces = "application/json")
public class StudentsRest {

    private final StudentService studentService;

    @Autowired
    public StudentsRest(StudentService studentService) {
        this.studentService = studentService;
    }

    // Obtener todos los estudiantes
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.findAll();
    }

    // Obtener estudiante por ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.findById(id);
    }

    // Filtrar por programa académico
    @GetMapping("/academic-program/{academicProgram}")
    public List<Student> getStudentsByAcademicProgram(@PathVariable String academicProgram) {
        return studentService.findByAcademicProgram(academicProgram);
    }

    // Filtrar por ciclo académico
    @GetMapping("/academic-cycle/{academicCycle}")
    public List<Student> getStudentsByAcademicCycle(@PathVariable Integer academicCycle) {
        return studentService.findByAcademicCycle(academicCycle);
    }

    // Filtrar por estado (activo/inactivo)
    @GetMapping("/state/{state}")
    public List<Student> getStudentsByState(@PathVariable Boolean state) {
        return studentService.findByState(state);
    }

    // Filtrar por departamento
    @GetMapping("/department/{department}")
    public List<Student> getStudentsByDepartment(@PathVariable String department) {
        return studentService.findByDepartment(department);
    }

    // Filtrar por provincia
    @GetMapping("/province/{province}")
    public List<Student> getStudentsByProvince(@PathVariable String province) {
        return studentService.findByProvince(province);
    }

    // Filtrar por distrito
    @GetMapping("/district/{district}")
    public List<Student> getStudentsByDistrict(@PathVariable String district) {
        return studentService.findByDistrict(district);
    }

    // Obtener todos los departamentos disponibles
    @GetMapping("/locations/departments")
    public List<String> getAllDepartments() {
        return studentService.findAllDepartments();
    }

    // Obtener provincias según departamento
    @GetMapping("/locations/provinces")
    public List<String> getProvincesByDepartment(@RequestParam String department) {
        return studentService.findProvincesByDepartment(department);
    }

    // Obtener distritos según departamento y provincia
    @GetMapping("/locations/districts")
    public List<String> getDistrictsByDeptAndProv(@RequestParam String department, @RequestParam String province) {
        return studentService.findDistrictsByDeptAndProv(department, province);
    }

    // Guardar nuevo estudiante
    @PostMapping("/save")
    public Student saveStudent(@RequestBody Student student) {
        return studentService.save(student);
    }

    // Actualizar estudiante existente
    @PostMapping("/update/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        student.setId(id);
        return studentService.update(student);
    }

    // Eliminar (lógicamente) estudiante
    @PostMapping("/delete/{id}")
    public Student deleteStudent(@PathVariable Long id) {
        return studentService.deleteById(id);
    }

    // Restaurar estudiante eliminado
    @PostMapping("/restore/{id}")
    public Student restoreStudent(@PathVariable Long id) {
        return studentService.restore(id);
    }

    // Exportar a PDF usando JasperReport
    @GetMapping("/pdf")
    public ResponseEntity<byte[]> exportToPDF() {
        try {
            byte[] pdf = studentService.generateJasperPdfReport();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=estudiantes.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
