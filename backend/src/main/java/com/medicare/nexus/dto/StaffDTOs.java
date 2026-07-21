package com.medicare.nexus.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class StaffDTOs {

    public static class AddMedicineRequest {
        private String name;
        private String genericName;
        private String manufacturer;
        private String category;
        private String dosageForm;
        private String unit;
        private String description;
        private Integer initialStock;
        private Integer reorderLevel;
        private BigDecimal pricePerUnit;
        private String batchNumber;
        private LocalDate expiryDate;

        public AddMedicineRequest() {}

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
        public Integer getInitialStock() { return initialStock; }
        public void setInitialStock(Integer initialStock) { this.initialStock = initialStock; }
        public Integer getReorderLevel() { return reorderLevel; }
        public void setReorderLevel(Integer reorderLevel) { this.reorderLevel = reorderLevel; }
        public BigDecimal getPricePerUnit() { return pricePerUnit; }
        public void setPricePerUnit(BigDecimal pricePerUnit) { this.pricePerUnit = pricePerUnit; }
        public String getBatchNumber() { return batchNumber; }
        public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }
        public LocalDate getExpiryDate() { return expiryDate; }
        public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }
    }

    public static class UpdateStockRequest {
        private Integer newQuantity;
        private Integer reorderLevel;

        public UpdateStockRequest() {}

        public Integer getNewQuantity() { return newQuantity; }
        public void setNewQuantity(Integer newQuantity) { this.newQuantity = newQuantity; }
        public Integer getReorderLevel() { return reorderLevel; }
        public void setReorderLevel(Integer reorderLevel) { this.reorderLevel = reorderLevel; }
    }
}
