# Kylan Hurt's Ava Labs Submission

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Explanation

Admittedly, most of the blockchain work I've done has been with non-EVM chains, so re-orienting myself with the Ethereum / EVM way of doing things can be a challenge. For example, last time I worked with an EVM I used ethers.js. I found ethers.js to be a very developer-unfriendly, so I am happy to see that the EVM ecosystem is trying to improve that developer experience with `wagmi` and `viem`.

### Component Library

I opted to use `reactstrap` as a component library because a.) I'm very familiar with it and I think it has an agreeable appearance and b.) I would prefer focusing on the web3 functionality for this task rather than re-inventing the wheel trying to add functionality to button and form components, etc.

### wagmi and viem

Although I was unfamiliar with `wagmi` and `viem`, I was able to do some quick research to see what functionality they offer. `wagmi` ended up being my preferred library for web3 functionality, and apparently it is built on top of `viem`. `wagmi` is undergoind a migration from v1 to v2, and I opted for v1 because I found v2 to be very buggy (it is apparently very new). I should point out that the documentation for WAGMI still seems very disorganized (lots of redirects and 404 status codes for methods that **should or do exist**. For example I use `useWaitForTransaction` in this repo but the documentation for it 404's here: https://wagmi.sh/react/api/hooks/useWaitForTransaction).

Since my app is split up into three main components, Connect button, "Send" form, and Transactions table it makes sense for the `wagmi` user data to be at the top level so that all three components can have access to the user's data (eg crypto balance, address, etc).

### Connect button

The `Connect` component consists primarily of a button for logging into the Avalanche Fuji account via the wallet of your choice. Once connected it shows the user's balance and a truncated version of their address in the button. **To disconnect an account the user can just click on the button again.**

### Send Form

I started off writing the form inputs with quite a bit of custom client-side validation to make sure the address was valid and that a valid amount is being sent, but eventually found that `useContractWrite` has provides error-related data so I started using that for validation. **While this is what the `wagmi` developers expect us to do, I find that the latency and error message syntax are mediocre and would recommend that large apps consider using their own custom validation**.

When we send out the transaction, we get back the hash for said transaction and add it to the list of recent transactions (shown in the table). Each row of the transactions table keeps track of its status (and eventually updates with which block it was included in).

### Tests

I have included a couple of tests for some of the utility functions that were used in my app. I actually don't believe there's a ton of testing needed for this app since a.) I used a component library for common components and b.) `wagmi` does a lot of the heavy lifting. It doesn't make sense for me to be testing how well those libraries work.
