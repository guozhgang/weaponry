package com.cce.weaponry.entity.credit;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;

import com.cce.weaponry.entity.level.ProfessorTeam;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("EvaluationTeam")
public class EvaluationTeam extends ProfessorTeam {
	private List<EvaluationExpert> professorList = new ArrayList<EvaluationExpert>(); // 评审专家列表

	@OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
	public List<EvaluationExpert> getProfessorList() {
		return professorList;
	}

	public void setProfessorList(List<EvaluationExpert> professorList) {
		this.professorList = professorList;
	}

}
