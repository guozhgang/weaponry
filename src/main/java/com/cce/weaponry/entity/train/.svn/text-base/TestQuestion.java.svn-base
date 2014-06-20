package com.cce.weaponry.entity.train;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the test_questions database table.
 * 
 */
@Entity
@Table(name="test_questions")
public class TestQuestion extends IdEntity {
	private static final long serialVersionUID = 1L;

	private String answer;// 回答
	private String question;// 问题
	private String type;// 类型
	private List<TrainingTest> trainingTests = new ArrayList<TrainingTest>();

    public TestQuestion() {
    }

	@Column(name = "TQ_Answer", length = 500)
	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	@Column(name = "TQ_Question", length = 200)
	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	@Column(name = "TQ_Type", length = 50)
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	//bi-directional many-to-one association to TrainingTest
	@OneToMany(mappedBy="testQuestion")
	public List<TrainingTest> getTrainingTests() {
		return this.trainingTests;
	}

	public void setTrainingTests(List<TrainingTest> trainingTests) {
		this.trainingTests = trainingTests;
	}
	
}