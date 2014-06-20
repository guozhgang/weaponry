package com.cce.weaponry.entity.train;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the traning_history database table.
 * 
 */
@Entity
@Table(name="traning_history")
public class TraningHistory extends IdEntity {
	private static final long serialVersionUID = 1L;

	private byte[] thChatmemo;
	private Timestamp src;
	private Timestamp target;
	private List<TrainingMember> trainingMembers = new ArrayList<TrainingMember>();
	private List<TrainingTest> trainingTests = new ArrayList<TrainingTest>();
	private OnlineTraining onlineTraining;
	private TrainingOwner trainingOwner;

    public TraningHistory() {
    }

	@Lob()
	@Column(name = "TH_CHATMEMO")
	public byte[] getThChatmemo() {
		return this.thChatmemo;
	}

	public void setThChatmemo(byte[] thChatmemo) {
		this.thChatmemo = thChatmemo;
	}

	@Column(name = "TH_From")
	public Timestamp getSrc() {
		return src;
	}

	public void setSrc(Timestamp src) {
		this.src = src;
	}

	@Column(name = "TH_To")
	public Timestamp getTarget() {
		return target;
	}

	public void setTarget(Timestamp target) {
		this.target = target;
	}

	// bi-directional many-to-one association to TrainingMember
	@OneToMany
	@JoinColumn(name = "TM_ID")
	public List<TrainingMember> getTrainingMembers() {
		return this.trainingMembers;
	}

	public void setTrainingMembers(List<TrainingMember> trainingMembers) {
		this.trainingMembers = trainingMembers;
	}

	//bi-directional many-to-one association to TrainingTest
	@OneToMany
	@JoinColumn(name = "TT_ID")
	public List<TrainingTest> getTrainingTests() {
		return this.trainingTests;
	}

	public void setTrainingTests(List<TrainingTest> trainingTests) {
		this.trainingTests = trainingTests;
	}
	

	//bi-directional many-to-one association to OnlineTraining
    @ManyToOne
	@JoinColumn(name="Test")
	public OnlineTraining getOnlineTraining() {
		return this.onlineTraining;
	}

	public void setOnlineTraining(OnlineTraining onlineTraining) {
		this.onlineTraining = onlineTraining;
	}
	

	//bi-directional many-to-one association to TrainingOwner
    @ManyToOne
	@JoinColumn(name="Owner")
	public TrainingOwner getTrainingOwner() {
		return this.trainingOwner;
	}

	public void setTrainingOwner(TrainingOwner trainingOwner) {
		this.trainingOwner = trainingOwner;
	}
	
}