import moment from 'moment';

const rnd = num => Math.round(num * 100) / 100


function generateplan(amount, duration, interestRate, initialDate) {

    try {

        if (interestRate <= 0) throw("Nominal Rate must be greater than zero")

        var response = [];
        var interestSum = 0;
        var borrowerPaymentAmountSum = 0;
        let date = moment(initialDate)

        var interestRateMonth = (interestRate / 100) / 12;

        let initialOutstandingPrincipal = amount;
        for (var i = 0; i < duration; i++) {

            let annuity = (amount * interestRateMonth / (1 - 1 / Math.pow(1 + interestRateMonth, duration)));
            let interest = interestRate * initialOutstandingPrincipal * 30 / 360 / 100;
            let roundedInterest = Math.round(interest)
            let principal = annuity - roundedInterest;
            let borrowerPaymentAmount = principal + interest;
            let remainingOutstandingPrincipal = initialOutstandingPrincipal - principal;

            borrowerPaymentAmountSum += principal;
            interestSum += interest;

            if (i === duration - 1) {
                borrowerPaymentAmountSum += remainingOutstandingPrincipal;
                remainingOutstandingPrincipal = 0;
            }

            response.push({
                borrowerPaymentAmount: borrowerPaymentAmount.toFixed(2),
                date: date.toISOString(),
                initialOutstandingPrincipal: initialOutstandingPrincipal.toFixed(2),
                interest: interest.toFixed(2),
                principal: principal.toFixed(2),
                remainingOutstandingPrincipal: remainingOutstandingPrincipal.toFixed(2),
            });

            date = date.add(1, 'M');
            initialOutstandingPrincipal = remainingOutstandingPrincipal;

        }
        return {
            result: "OK",
            data: response
        }
    }
    catch (e) {
        return {
            result: "Internal Error",
            data: e
        }
    }

}

function generate(req, res, next) {


    let plan = generateplan(
        Number(req.body.loanAmount),
        req.body.duration,
        Number(req.body.nominalRate),
        req.body.startDate)

    let status = plan.result === "OK" ? 200 : 404
    res.status(status)
        .json({
            status: status,
            statusText: plan.result,
            message: plan.data,
        });
}



export default { generate }
