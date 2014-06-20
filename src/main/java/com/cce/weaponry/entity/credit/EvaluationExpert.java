package com.cce.weaponry.entity.credit;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.cce.weaponry.entity.level.ProfessorInfo;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("EvaluationExpert")
public class EvaluationExpert extends ProfessorInfo {

	private String resumeUrl;// 简历路径

	@Column(name = "resume_url", length = 150)
	public String getResumeUrl() {
		return resumeUrl;
	}

	public void setResumeUrl(String resumeUrl) {
		this.resumeUrl = resumeUrl;
	}

	private EvaluationTeam team;

	@ManyToOne
	@JoinColumn(name = "PT_ID")
	public EvaluationTeam getTeam() {
		return team;
	}

	public void setTeam(EvaluationTeam team) {
		this.team = team;
	}
}
