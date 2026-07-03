package pe.edu.hackathon.ms_students.infrastructure.adapter.out.repository;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import pe.edu.hackathon.ms_students.domain.model.Student;

@Repository
public interface StudentR2dbcRepository extends ReactiveCrudRepository<Student, Long>{
    
}
