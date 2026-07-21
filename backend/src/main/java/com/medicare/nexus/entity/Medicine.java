package com.medicare.nexus.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "medicines")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "generic_name", length = 150)
    private String genericName;

    @Column(length = 150)
    private String manufacturer;

    @Column(length = 50)
    private String category;

    @Column(name = "dosage_form", length = 50)
    private String dosageForm;

    @Column(length = 20)
    private String unit;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Medicine() {}

    public Medicine(Long id, String name, String genericName, String manufacturer, String category, String dosageForm, String unit, String description) {
        this.id = id;
        this.name = name;
        this.genericName = genericName;
        this.manufacturer = manufacturer;
        this.category = category;
        this.dosageForm = dosageForm;
        this.unit = unit;
        this.description = description;
    }

    public static MedicineBuilder builder() {
        return new MedicineBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGenericName() { return genericName; }
    public void setGenericName(String genericName) { this.genericName = genericName; }

    public String getManufacturer() { return manufacturer; }
    public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDosageForm() { return dosageForm; }
    public void setDosageForm(String dosageForm) { this.dosageForm = dosageForm; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public static class MedicineBuilder {
        private Long id;
        private String name;
        private String genericName;
        private String manufacturer;
        private String category;
        private String dosageForm;
        private String unit;
        private String description;

        public MedicineBuilder id(Long id) { this.id = id; return this; }
        public MedicineBuilder name(String name) { this.name = name; return this; }
        public MedicineBuilder genericName(String genericName) { this.genericName = genericName; return this; }
        public MedicineBuilder manufacturer(String manufacturer) { this.manufacturer = manufacturer; return this; }
        public MedicineBuilder category(String category) { this.category = category; return this; }
        public MedicineBuilder dosageForm(String dosageForm) { this.dosageForm = dosageForm; return this; }
        public MedicineBuilder unit(String unit) { this.unit = unit; return this; }
        public MedicineBuilder description(String description) { this.description = description; return this; }

        public Medicine build() {
            return new Medicine(id, name, genericName, manufacturer, category, dosageForm, unit, description);
        }
    }
}
