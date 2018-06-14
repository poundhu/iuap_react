import React ,{ Component } from 'react';
import { actions } from "mirrorx";
import ReactDOM from 'react-dom';
import { Col, Tile,Icon ,Popover} from 'tinper-bee';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './index.less';


export default class TileGroup extends Component{
    static defaultProps = {
        name: 'hello',
        style: '',
        margin: 5,
        colCount: 6,
        totalCount:12,
        data:[]
    };
    constructor() {
		super();
    }

    componentDidMount () {
        
    }
    handleClick(){
        actions.routing.push("/ims/trendchart");
        actions.trendchart.load({type:'addTagName',id:"506456d7-e1f5-4d48-858f-03c0e39fa241"});
    }
    render() {
        let {name, style, margin, colCount, totalCount, data}= this.props;
        let showTileGroup = (name, style, margin, data) => {
            let mds = 12/colCount;
            let labs = new Array(totalCount);
            for(let i = 0; i < totalCount; i++){
                let info_content = ()=>{
                    if(data[i].infos){
                        let info = new Array(data[i].infos.length);
                        info.push(<h4>参数</h4>);
                        for (const o of data[i].infos) {
                            info.push(<div>{o.name}: {o.value} {o.pk_unit_name}</div>);
                        }
                        return info;
                    }else{
                        return (<div>请刷新，待加载...</div>);
                    }
                }
                
                labs.push(
                    <Col md={mds} key={i+1}>
                        <ContextMenuTrigger id="ALERT_MENU">
                            <Tile className="tile-style">
                                <div className="tile-name">{data[i].name}-{i}</div>
                                <div className="tile-value">
                                    {data[i].value?data[i].value:0}
                                    <span className="tile-unit">{data[i].unit}</span>
                                </div>
                                <Popover
                                    placement="bottom"
                                    content={info_content()}
                                    trigger="hover"
                                    id="bottom"
                                >
                                    <Icon type='uf-i' className='info-icon-style'></Icon>
                                </Popover>
                                
                            </Tile>
                            
                        </ContextMenuTrigger>
                    </Col>
                );
            }
            return labs;
        };
        return <div>
                {showTileGroup(name, style, margin, data)} 
                <ContextMenu id="ALERT_MENU">
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        趋势1
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        趋势2
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        趋势3
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        趋势4
                    </MenuItem>
                </ContextMenu>
            </div>
    }
}