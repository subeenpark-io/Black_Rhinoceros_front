import Data from '../Data';
import LinearRegression from '../LinearRegression';
import LogisticRegression from '../LogisticRegression';
import TrainModel from '../TrainModel';
import ScoreModel from '../ScoreModel';
import EvaluateModel from '../EvaluateModel';

const NodeTypes = {
  data: Data,
  linearRegression: LinearRegression,
  logisticRegression: LogisticRegression,
  trainModel: TrainModel,
  scoreModel: ScoreModel,
  evaluateModel: EvaluateModel,
};

export default NodeTypes;
