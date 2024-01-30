module frog_bank::bank_tests{
    use sui::test_utils::assert_eq;
    use sui::coin::{mint_for_testing, burn_for_testing};
    use sui::test_scenario as ts;

    use frog_bank::bank::{Self, Bank,OwnerCap};

    const ADMIN: address = @0xBEEF;
    const ALICE: address = @0x1337;

    #[test]
    fun test_deposit(){
        let scenario = init_bank();
        let scenario_mut = &mut scenario;
        ts::next_tx(scenario_mut, ALICE);
        {
            let bank = ts::take_shared<Bank>(scenario_mut);

            deposit(&mut bank, 100,scenario_mut);

            assert_eq(bank::user_balance(&bank, ALICE), 95);

            ts::return_shared(bank);
        };

        ts::end(scenario);
    }

    #[test]
    fun test_withdraw(){
        let scenario = init_bank();
        let scenario_mut = &mut scenario;
        ts::next_tx(scenario_mut, ALICE);
        {
            let bank = ts::take_shared<Bank>(scenario_mut);

            let coin_out = bank::withdraw(&mut bank,ts::ctx(scenario_mut));

            assert_eq(burn_for_testing(coin_out),0);

            ts::return_shared(bank);
        };
        
        ts::next_tx(scenario_mut, ALICE);
        {
            let bank = ts::take_shared<Bank>(scenario_mut);

            deposit(&mut bank, 100,scenario_mut);

            assert_eq(bank::user_balance(&bank, ALICE), 95);

            let coin_out = bank::withdraw(&mut bank,ts::ctx(scenario_mut));

            assert_eq(burn_for_testing(coin_out),95);
            assert_eq(bank::user_balance(&bank, ALICE), 0);

            ts::return_shared(bank);
        };

        ts::end(scenario);
    }

    #[test]
    fun test_claim(){
        let scenario = init_bank();
        let scenario_mut = &mut scenario;

        ts::next_tx(scenario_mut, ADMIN);
        {
            let cap = ts::take_from_sender<OwnerCap>(scenario_mut);
            let bank = ts::take_shared<Bank>(scenario_mut);

            deposit(&mut bank, 100,scenario_mut);

            assert_eq(bank::admin_balance(&bank),5);

            let coin_out = bank::claim( &cap,&mut bank,ts::ctx(scenario_mut));

            assert_eq(burn_for_testing(coin_out),5);
            assert_eq(bank::admin_balance(&bank), 0);

            ts::return_to_sender(scenario_mut, cap);
            ts::return_shared(bank);
        };
        ts::end(scenario);
    }

    fun init_bank():ts::Scenario{
        let scenario_val = ts::begin(ADMIN);
        let scenario_mut = &mut scenario_val;
        {
            bank::init_for_testing(ts::ctx(scenario_mut));
        };
        scenario_val
    }

    fun deposit(bank: &mut Bank, amount: u64, scenario: &mut ts::Scenario){
        bank::deposit(bank, mint_for_testing(amount,ts::ctx(scenario)), ts::ctx(scenario));
    }
}