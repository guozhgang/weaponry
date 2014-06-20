package com.cce.weaponry.entity.level;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.dict.DictCheckStep;

@Entity
@Table(name = "check_steps")
public class CheckSteps extends IdEntity {
	private Approval4Level approval;//
	private DictCheckStep step;// 步骤名称
	private int position; // 顺序
	boolean checked;

	@ManyToOne
	@JoinColumn(name = "step")
	public DictCheckStep getStep() {
		return step;
	}

	public void setStep(DictCheckStep step) {
		this.step = step;
	}

	@ManyToOne
	@JoinColumn(name = "approval")
	public Approval4Level getApproval() {
		return approval;
	}

	public void setApproval(Approval4Level approval) {
		this.approval = approval;
	}

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

}
