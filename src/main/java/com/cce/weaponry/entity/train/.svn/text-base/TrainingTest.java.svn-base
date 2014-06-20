package com.cce.weaponry.entity.train;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the training_test database table.
 * 
 */
@Entity
@Table(name="training_test")
public class TrainingTest extends IdEntity {
	private static final long serialVersionUID = 1L;

	private List<TestResult> testResults = new ArrayList<TestResult>();
	private TestQuestion testQuestion;

    public TrainingTest() {
    }

	//bi-directional many-to-one association to TestResult
	@OneToMany(mappedBy="trainingTest")
	public List<TestResult> getTestResults() {
		return this.testResults;
	}

	public void setTestResults(List<TestResult> testResults) {
		this.testResults = testResults;
	}
	

	//bi-directional many-to-one association to TestQuestion
    @ManyToOne
	@JoinColumn(name="TQ_ID")
	public TestQuestion getTestQuestion() {
		return this.testQuestion;
	}

	public void setTestQuestion(TestQuestion testQuestion) {
		this.testQuestion = testQuestion;
	}
}