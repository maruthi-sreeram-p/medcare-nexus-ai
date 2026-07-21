package com.medicare.nexus.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "medicine_id", nullable = false, unique = true)
    private Medicine medicine;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity = 0;

    @Column(name = "reorder_level", nullable = false)
    private Integer reorderLevel = 10;

    @Column(name = "price_per_unit", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerUnit;

    @Column(name = "batch_number", length = 50)
    private String batchNumber;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(length = 20)
    private String status = "IN_STOCK";

    public Inventory() {}

    public Inventory(Long id, Medicine medicine, Integer stockQuantity, Integer reorderLevel, BigDecimal pricePerUnit, String batchNumber, LocalDate expiryDate, String status) {
        this.id = id;
        this.medicine = medicine;
        this.stockQuantity = stockQuantity != null ? stockQuantity : 0;
        this.reorderLevel = reorderLevel != null ? reorderLevel : 10;
        this.pricePerUnit = pricePerUnit;
        this.batchNumber = batchNumber;
        this.expiryDate = expiryDate;
        this.status = status != null ? status : "IN_STOCK";
    }

    public static InventoryBuilder builder() {
        return new InventoryBuilder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Medicine getMedicine() { return medicine; }
    public void setMedicine(Medicine medicine) { this.medicine = medicine; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public Integer getReorderLevel() { return reorderLevel; }
    public void setReorderLevel(Integer reorderLevel) { this.reorderLevel = reorderLevel; }

    public BigDecimal getPricePerUnit() { return pricePerUnit; }
    public void setPricePerUnit(BigDecimal pricePerUnit) { this.pricePerUnit = pricePerUnit; }

    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public static class InventoryBuilder {
        private Long id;
        private Medicine medicine;
        private Integer stockQuantity = 0;
        private Integer reorderLevel = 10;
        private BigDecimal pricePerUnit;
        private String batchNumber;
        private LocalDate expiryDate;
        private String status = "IN_STOCK";

        public InventoryBuilder id(Long id) { this.id = id; return this; }
        public InventoryBuilder medicine(Medicine medicine) { this.medicine = medicine; return this; }
        public InventoryBuilder stockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public InventoryBuilder reorderLevel(Integer reorderLevel) { this.reorderLevel = reorderLevel; return this; }
        public InventoryBuilder pricePerUnit(BigDecimal pricePerUnit) { this.pricePerUnit = pricePerUnit; return this; }
        public InventoryBuilder batchNumber(String batchNumber) { this.batchNumber = batchNumber; return this; }
        public InventoryBuilder expiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; return this; }
        public InventoryBuilder status(String status) { this.status = status; return this; }

        public Inventory build() {
            return new Inventory(id, medicine, stockQuantity, reorderLevel, pricePerUnit, batchNumber, expiryDate, status);
        }
    }
}
