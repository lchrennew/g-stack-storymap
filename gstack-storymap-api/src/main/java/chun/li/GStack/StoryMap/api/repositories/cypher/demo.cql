MATCH (c:Card), (to:Project)
 WHERE id(c)=188 AND id(to)=222
 OPTIONAL MATCH (c_prev:Card)-[r_prev:NEXT]->(c)
 OPTIONAL MATCH (c)-[r_next:NEXT]->(c_next:Card)
 DELETE r_prev
 FOREACH(r IN CASE WHEN c_prev IS NOT NULL AND c_next IS NOT NULL THEN [1] ELSE [] END |
 CREATE (c_prev)-[:NEXT]->(c_next)
 )
 FOREACH(r IN CASE WHEN c_prev IS NOT NULL AND c_next IS NOT NULL THEN [1] ELSE [] END |
 CREATE (c_prev)-[:NEXT]->(c_next)
 )

 MATCH (c:Card), (to:Project)
  WHERE id(c)=$id AND id(to)=$to
  MATCH (c_prev:Card)-[r_prev:NEXT]->(c)
  MATCH (c)-[r_next:NEXT]->(c_next:Card)
  MATCH (c_general:Card)-[r_general:DETAIL]->(c)
  MATCH (c_root:Project)-[r_root:DETAIL]->(c)
  MATCH (c_for:Card)-[r_for:PLAN]->(c)
  MATCH (c)-[r_rel:PLANNED_IN]->(c_rel:Release)
  MATCH (to:Project)-[r_to:DETAIL]->(to_root:Card)
  DELETE r_prev, r_next, r_general, r_root, r_for, r_rel
  DELETE r_to CREATE (c_prev)-[:NEXT]->(c_next)
  CREATE (c_general)-[:DETAIL]->(c_next)
  CREATE (c_root)-[:DETAIL]->(c_next)
  CREATE (c_for)-[:PLAN]->(c_next)
  CREATE (c_next)-[:PLANNED_IN]->(c_rel)
  CREATE (to)-[:DETAIL]->(c)
  CREATE (c)-[:NEXT]->(to_root)