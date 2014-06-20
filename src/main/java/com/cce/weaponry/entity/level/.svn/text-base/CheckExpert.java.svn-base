package com.cce.weaponry.entity.level;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("CheckExpert")
public class CheckExpert extends ProfessorInfo {

	private CheckTeam team; // 审查组

	@ManyToOne
	@JoinColumn(name = "PT_ID")
	public CheckTeam getTeam() {
		return team;
	}

	public void setTeam(CheckTeam team) {
		this.team = team;
	}
}
