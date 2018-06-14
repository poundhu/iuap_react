import React, { Component } from 'react';
import { Icon,Button,Modal } from 'tinper-bee';
import './index.less';

export default class DeleteModal extends Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		let { showDelModal, closeDelModal, delData,content,title}= this.props;
		return <Modal
		show={showDelModal?showDelModal:false}
		style={{ width: 500 }}
		className="modal-style"
		onHide={closeDelModal}
	>
		<Modal.Header className="u-modal-header" closeButton>
			<Modal.Title>{title?title:"删除"}</Modal.Title>
		</Modal.Header>

		<Modal.Body className="u-modal-body">
			<Icon type="uf-exc-t-o" />
			{content?content:"确认删除吗？"}
		</Modal.Body>

		<Modal.Footer className="u-modal-footer " style = {{background: 'white'}}> 
			<Button colors="primary" className="btn-ok" onClick={delData}>
				确认
			</Button>
			<Button className="btn-cancel" onClick={closeDelModal}>
				取消
			</Button>

		</Modal.Footer>
	</Modal>
	}
}
