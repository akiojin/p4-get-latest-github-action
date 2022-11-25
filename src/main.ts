import * as core from '@actions/core'
import { P4 } from '@akiojin/p4-command'

const IsWindows = process.platform.toLowerCase() === 'win32'

async function Run(): Promise<void> 
{
    try {
        if (!IsWindows) {
            throw new Error('Not supported platform.')
        }

        P4.Initialize(
            core.getInput('server'),
            core.getInput('username'),
            core.getInput('workspace'));

        core.startGroup('p4 sync')
        await P4.GetLatest(core.getInput('password'))
        core.endGroup()
    } catch (ex: any) {
        core.setFailed(ex.message);
    }
}

Run()
