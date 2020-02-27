import React, { Component } from 'react';
import moment from 'moment';

export default class Horas extends Component {

    componentDidMount() {
        setInterval(() => {
            this.updateData();
        }, 1000)
    }

    state = {
        cheguei: '',
        saiAlmoco: '',
        volteiAlmoco: '',
        possoSair: '',
        horasRestantes: ''
    }

    updateData = () => {
        if (this.state.possoSair) {
            const dataAtualFormat = moment().format('YYYY-MM-DD');
            var momentPossoSair = moment(`${dataAtualFormat} ${this.state.possoSair}:00`);

            const momentAtual = moment(new Date());
            const segundosRestantes = momentPossoSair.diff(momentAtual, 'seconds', true);

            const horasRestantes = moment(`${dataAtualFormat}`).startOf('day').seconds(segundosRestantes).format('H:mm:ss');

            this.setState({
                horasRestantes
            })
        }
    }

    calculate = () => {
        const { cheguei, saiAlmoco, volteiAlmoco } = this.state;
        if (cheguei && saiAlmoco && volteiAlmoco) {
            const segundosTrabalho = 31680;
            var segundosTrabalhados = 0;

            const dataAtualFormat = moment().format('YYYY-MM-DD');

            var momentCheguei = moment(`${dataAtualFormat} ${cheguei}:00`);
            var momentSaiAlmoco = moment(`${dataAtualFormat} ${saiAlmoco}:00`);
            var momentVolteiAlmoco = moment(`${dataAtualFormat} ${volteiAlmoco}:00`);

            segundosTrabalhados += momentSaiAlmoco.diff(momentCheguei, 'seconds');

            const momentPossoSair = momentVolteiAlmoco.clone().add(segundosTrabalho - segundosTrabalhados, 'seconds');

            this.setState({
                possoSair: momentPossoSair.format('HH:mm')
            });
        } else {
            this.setState({ possoSair: '' })
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({ [name]: event.target.value }, this.calculate);
    }

    render() {
        return (
            <div>
                <div className="row mt-5 text-center">
                    <div className="col-sm-2 form-group  m-auto">
                        <label className="font-weight-bold">Cheguei</label>
                        <input type="time" name="cheguei" value={this.state.cheguei} onChange={this.handleChange} className="form-control text-center" />
                    </div>

                    <div className="col-sm-2 form-group m-auto">
                        <label className="font-weight-bold">Saí</label>
                        <input type="time" name="saiAlmoco" value={this.state.saiAlmoco} onChange={this.handleChange} className="form-control text-center" />
                    </div>

                    <div className="col-sm-2 form-group m-auto">
                        <label className="font-weight-bold">Voltei</label>
                        <input type="time" name="volteiAlmoco" value={this.state.volteiAlmoco} onChange={this.handleChange} className="form-control text-center" />
                    </div>
                </div>

                {
                    this.state.possoSair &&
                    <div>
                        <div className="row">
                            <div className="col-12">
                                <h3 className="text-center mt-5">{this.state.possoSair}</h3>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-center mt-3">{this.state.horasRestantes}</h5>
                            </div>
                        </div>
                    </div>
                }

            </div>
        );
    }
}