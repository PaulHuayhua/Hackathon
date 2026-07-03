package pe.edu.hackathon.ms_students.domain.service;

import pe.edu.hackathon.ms_students.domain.model.Student;
import pe.edu.hackathon.ms_students.application.port.in.StudentUseCase;
import pe.edu.hackathon.ms_students.application.port.out.StudentRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.stereotype.Service;

@Service
public class StudentServiceDomain implements StudentUseCase {

    private final StudentRepository studentRepository;

    public StudentServiceDomain(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Flux<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public Mono<Student> findById(Long id) {
        return studentRepository.findById(id);
    }

    @Override
    public Mono<Student> save(Student student) {
        student.setActive(true);
        return studentRepository.save(student);
    }

    @Override
    public Mono<Student> update(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Mono<Student> deactivate(Long id) {
        return studentRepository.findById(id)
                .flatMap(student -> {
                    student.setActive(false);
                    return studentRepository.save(student);
                });
    }

    @Override
    public Mono<Student> activate(Long id) {
        return studentRepository.findById(id)
                .flatMap(student -> {
                    student.setActive(true);
                    return studentRepository.save(student);
                });
    }
    
}
