package vg.paul.huayhua.hackathon.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "students")
public class Student {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "identifier")
    private Long id;

    @Column(name = "code", nullable = false, unique = true)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "dni", nullable = false, unique = true)
    private String dni;

    @Column(name = "gender", nullable = false)
    private Character gender;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "province", nullable = false)
    private String province;

    @Column(name = "district", nullable = false)
    private String district;

    @Column(name = "academic_program", nullable = false)
    private String academicProgram;

    @Column(name = "academic_cycle", nullable = false)
    private Integer academicCycle;

    @Column(name = "date_registration", nullable = false)
    private LocalDate dateRegistration;

    @Column(name = "state", nullable = false)
    private Boolean state;
}
