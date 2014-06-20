package com.cce.weaponry.entity.train;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the test_results database table.
 * 
 */
@Entity
@Table(name="test_results")
public class TestResult extends IdEntity {
	private static final long serialVersionUID = 1L;

	private String answer;// 回答
	private String owner;// 拥有者
	private TrainingTest trainingTest;

    public TestResult() {
    }

	@Column(name = "TR_Answer", length = 500)
	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	@Column(name = "TR_Owner", length = 50)
	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	//bi-directional many-to-one association to TrainingTest
    @ManyToOne
	@JoinColumn(name="TT_ID")
	public TrainingTest getTrainingTest() {
		return this.trainingTest;
	}

	public void setTrainingTest(TrainingTest trainingTest) {
		this.trainingTest = trainingTest;
	}
	
}