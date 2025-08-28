package com.track.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.track.model.Expense;
import com.track.repository.ExpenseRepository;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    // ✅ Correct place for updateExpense
    public Expense updateExpense(Long id, Expense expense) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id " + id));

        existing.setAmount(expense.getAmount());
        existing.setCategory(expense.getCategory());
        existing.setDescription(expense.getDescription());
        existing.setDate(expense.getDate());

        return expenseRepository.save(existing);
    }
}
