import React from "react";
import "./style.css";
import { Card, Row } from "antd";
import Button from "../Button";
function Cards({
  income,
  expenses,
  totalBalance,
  showIncomeModal,
  showExpenseModal,
  handleReset,
}) {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card" bordered={true}>
          <h2>Current Balance</h2>
          <p>&#8377; {totalBalance}</p> {/* Used for showing Rupee sign */}
          <Button text={"Reset Balance"} blue={true} onClick={handleReset} />
        </Card>

        <Card className="my-card" bordered={true}>
          <h2>Total Income</h2>
          <p>&#8377; {income}</p> {/* Used for showing Rupee sign */}
          <Button text={"Add Income"} blue={true} onClick={showIncomeModal} />
        </Card>

        <Card className="my-card" bordered={true}>
          <h2>Total Expenses</h2>
          <p>&#8377; {expenses}</p> {/* Used for showing Rupee sign */}
          <Button
            text={"Add Expenses"}
            blue={true}
            onClick={showExpenseModal}
          />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
