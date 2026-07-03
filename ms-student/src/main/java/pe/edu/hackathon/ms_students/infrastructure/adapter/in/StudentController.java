package pe.edu.hackathon.ms_students.infrastructure.adapter.in;

import org.springframework.web.bind.annotation.*;

import pe.edu.hackathon.ms_students.domain.model.Student;
import pe.edu.hackathon.ms_students.application.port.in.StudentUseCase;

import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;
@RestController
@RequestMapping("/v1/api/students")
public class StudentController {

    private final StudentUseCase studentUseCase;

    public StudentController(StudentUseCase studentUseCase) {
        this.studentUseCase = studentUseCase;
    }

    @GetMapping("")
    public Flux<Student> findAll(){
        return studentUseCase.findAll();
    }

    @GetMapping("/{id}")
    public Mono<Student> findById(@PathVariable Long id){
        return studentUseCase.findById(id);
    }

    @PostMapping("/create")
    public Mono<Student> save(@RequestBody Student student) {
        return studentUseCase.save(student);
    }

    @PutMapping("/update")
    public Mono<Student> update(@RequestBody Student student) {
        return studentUseCase.update(student);
    }

    @PatchMapping("/deactivate/{id}")
    public Mono<Student> deactivate(@PathVariable Long id) {
        return studentUseCase.deactivate(id);
    }

    @PatchMapping("/activate/{id}")
    public Mono<Student> activate(@PathVariable Long id) {
        return studentUseCase.activate(id);
    }
    
}
