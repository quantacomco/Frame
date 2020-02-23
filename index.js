// @flow
import React, { Component } from 'react';
import AppContext, { AppConsumer } from '../../../../utils/context/AppContext.js';
import PageTitle from '../../../elements/layout/PageTitle_B.js'

import { Ops } as op from '@Ops';
import { Collection } from '@Collection';
import { Portal } from '@Portal';
import { run } from './run.js';

// import { runlist } from 'run_.js';

const _Context = AppContext;

export default class Frame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            ready: false
        }

    }
    componentDidMount() {

        const runner = op.runner([ run.fetchThis, run.fetchThatWithThis, run.somethingElse ])
        
        runner.before(this.props.runner)

        op.start(runner)

    }
    render() {

        const { portalConfig, runner } = this.props

        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return (
            <>
                <section id={"Frame-"+ this.props.pagetitle } className="flex flex-column w-100 mw9 center pa4 pb6">

                    <PageTitle
                        title={this.props.pagetitle}
                        docs={this.state.conversations}
                        ready={this.state.ready}
                    />

                    <div className="flex flex-row flex-wrap justify-between br3 overflow-hidden bg-white-50">
                        {this.props.children}
                    </div>

                    <div className="flex flex-row">
                        <div className="flex flex-row">
                            { _Context && _Context.credits && _Context.credits[0] && _Context.credits[0].title }
                        </div>
                    </div>


                    {
                        portalConfig.usePortal && 
                        <Portal context={_Context} config={portalConfig} />
                    }

                </section>

            </>

        );
    }
}

// export default Messages;
Frame.contextType = AppContext;