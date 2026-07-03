package pe.edu.hackathon.ms_students.infrastructure.adapter.in;

import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import pe.edu.hackathon.ms_students.application.port.in.StudentUseCase;
import pe.edu.hackathon.ms_students.domain.model.Student;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentUseCase studentUseCase;

    @GetMapping("/")
    public Flux<Student> findAll() {
        return studentUseCase.findAll();
    }

    @PostMapping("/create")
    public Mono<Student> create(@RequestBody Student student) {
        return studentUseCase.save(student);
    }

    @GetMapping("/{id}")
    public Mono<Student> findById(@PathVariable Long id) {
        return studentUseCase.findById(id);
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