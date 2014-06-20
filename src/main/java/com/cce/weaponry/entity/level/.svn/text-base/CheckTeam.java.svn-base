package com.cce.weaponry.entity.level;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;


@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("CheckTeam")
public class CheckTeam extends ProfessorTeam {
	private List<CheckExpert> professorList = new ArrayList<CheckExpert>();// 专家组
	private List<Approval4Level> approval4LevelList = new ArrayList<Approval4Level>();

	@OneToMany(mappedBy = "team")
	public List<Approval4Level> getApproval4LevelList() {
		return approval4LevelList;
	}

	public void setApproval4LevelList(List<Approval4Level> approval4LevelList) {
		this.approval4LevelList = approval4LevelList;
	}

	@OneToMany(mappedBy = "team")
	public List<CheckExpert> getProfessorList() {
		return professorList;
	}

	public void setProfessorList(List<CheckExpert> professorList) {
		this.professorList = professorList;
	}

}
